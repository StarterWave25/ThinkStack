import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmissionError from "./SubmissionError";

const STEPS = ["understanding", "breakdown", "approach", "solution", "reflection"];

function Workspace({ id, activeStep, draft, problem, isHintsTimerCompleted, saveProblem, onNext }) {
    const navigate = useNavigate();
    const storageKey = `problem-${id}-${activeStep}`;

    const [content, setContent] = useState(() => {
        try {
            const localData = localStorage.getItem(storageKey);
            if (localData !== null) return localData;
        } catch (e) {
            console.error("LocalStorage read error:", e);
        }
        return draft?.steps?.[activeStep] || "";
    });

    const [isHintUsed, setIsHintUsed] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setContent(value);
        try {
            localStorage.setItem(storageKey, value);
        } catch (err) {
            console.error("LocalStorage write error:", err);
        }
    };

    const handleSaveAndNext = async () => {
        setSubmissionError(null);
        try {
            await saveProblem({
                problemId: id,
                currentStep: activeStep,
                value: content,
                isHintUsed,
            }).unwrap();

            const currentIndex = STEPS.indexOf(activeStep);
            if (currentIndex === STEPS.length - 1) {
                navigate(`/solution/${id}`);
            } else {
                onNext(STEPS[currentIndex + 1]);
            }
        } catch (err) {
            console.error("Save error:", err);
            setSubmissionError(err);
        }
    };

    const getHint = () => {
        if (!problem?.hints) return null;
        const hintSteps = { breakdown: 0, approach: 1, solution: 2 };
        const hintIndex = hintSteps[activeStep];
        return hintIndex !== undefined && isHintsTimerCompleted ? problem.hints[hintIndex] : null;
    };

    return (
        <div className="problem-workspace">
            <SubmissionError error={submissionError} onClose={() => setSubmissionError(null)} />

            <textarea
                value={content}
                onChange={handleChange}
                placeholder={`Enter your ${activeStep} here...`}
                className="text-editor"
            />

            {getHint() && <details className="hint-dropdown" onToggle={(e) => e.target.open && setIsHintUsed(true)}>
                <summary>View Hint</summary>
                <div className="hint-content">{getHint()}</div>
            </details>}

            <button className="next-btn" onClick={handleSaveAndNext}>
                {activeStep === "reflection" ? "Submit" : "Save & Next"}
            </button>
        </div>
    );
}

export default Workspace;