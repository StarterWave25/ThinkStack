// Harsha here you need to refactor the components.

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProblemQuery, useSaveProblemMutation } from "../services/draftAPI";
import "./styles/Problem.css";

const STEPS = ["understanding", "breakdown", "approach", "solution", "reflection"];

function Workspace({ id, activeStep, draft, problem, saveProblem, onNext }) {
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
    }
  };

  const getHint = () => {
    if (!problem?.hints) return null;
    const hintSteps = { breakdown: 0, approach: 1, solution: 2 };
    const hintIndex = hintSteps[activeStep];
    return hintIndex !== undefined ? problem.hints[hintIndex] : null;
  };

  return (
    <div className="problem-workspace">
      <textarea
        value={content}
        onChange={handleChange}
        placeholder={`Enter your ${activeStep} here...`}
        className="text-editor"
      />

      {getHint() && (
        <details className="hint-dropdown" onToggle={(e) => e.target.open && setIsHintUsed(true)}>
          <summary>View Hint</summary>
          <div className="hint-content">{getHint()}</div>
        </details>
      )}

      <button className="next-btn" onClick={handleSaveAndNext}>
        {activeStep === "reflection" ? "Submit" : "Save & Next"}
      </button>
    </div>
  );
}

function Problem() {
  const { id } = useParams();
  const { data: response, isLoading, error } = useGetProblemQuery(id);
  const [saveProblem] = useSaveProblemMutation();
  const [activeStep, setActiveStep] = useState(STEPS[0]);

  const problem = response?.data?.problem || null;
  const draft = response?.data?.draft || null;

  if (isLoading) return <div className="problem-loading">Loading...</div>;
  if (error || (response && !response.OK)) return <div className="problem-error">Something went wrong.</div>;

  return (
    <div className="problem-container">
      <div className="problem-overview">
        <h1>{problem?.title}</h1>
        <div className="problem-meta">
          <span>{problem?.difficulty}</span> | <span>{problem?.category}</span>
        </div>
        <p>{problem?.description}</p>
      </div>

      <div className="problem-right-pane">
        <div className="step-navigation">
          {STEPS.map((step) => (
            <button
              key={step}
              className={activeStep === step ? "active" : ""}
              onClick={() => setActiveStep(step)}
            >
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
          saveProblem={saveProblem}
          onNext={setActiveStep}
        />
      </div>
    </div>
  );
}

export default Problem;