import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProblemQuery, useSaveProblemMutation } from "../../services/draftAPI";
import Workspace from "./components/Workspace";
import "./styles/Problem.css";
import "./styles/Workspace.css";

const STEPS = ["understanding", "breakdown", "approach", "solution", "reflection"];

function Problem() {
    const { id } = useParams();
    const { data: response, isLoading, error } = useGetProblemQuery(id);
    const [saveProblem] = useSaveProblemMutation();
    const [activeStep, setActiveStep] = useState(STEPS[0]);
    const [isHintsTimerCompleted, setIsHintsTimerCompleted] = useState(false);

    const problem = response?.data?.problem || null;
    const draft = response?.data?.draft || null;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsHintsTimerCompleted(true);
        }, 120);
        return () => clearTimeout(timer);
    }, [id]);

    if (isLoading) return <div className="problem-loading">Loading...</div>;
    if (error || (response && !response.OK)) return <div className="problem-error">Something went wrong.</div>;


    return (
        <div className="problem-container">
            <div className="problem-overview">
                <h1>{problem?.title}</h1>
                <div className="problem-meta">
                    <span className="problem-level" style={{
                        color: (problem?.difficulty === 'Easy') ? 'green' :
                            (problem?.difficulty === 'Medium') ? 'orange' : 'red'
                    }}>
                        {problem?.difficulty === 'Medium' ? 'Moderate' : problem.difficulty}</span>
                    <span className="problem-category">{problem?.category}</span>
                </div>
                <p className="problem-description">{problem?.description}</p>
            </div>

            <div className="problem-right-pane">
                <div className="step-navigation">
                    {STEPS.map((step) => (
                        <button
                            key={step}
                            className={`step-button${activeStep === step ? " active" : ""}`}
                            onClick={() => setActiveStep(step)}
                            disabled={step !== activeStep && step !== STEPS[0] && !draft?.steps?.[step]}>
                            {step}
                        </button>
                    ))}
                </div>

                <Workspace
                    key={`${id}-${activeStep}`}
                    id={id}
                    activeStep={activeStep}
                    draft={draft}
                    problem={problem}
                    isHintsTimerCompleted={isHintsTimerCompleted}
                    saveProblem={saveProblem}
                    onNext={setActiveStep}
                />
            </div>
        </div >
    );
}

export default Problem;