import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvaluateProblemMutation } from "../../services/evaluateAPI";
import "./Solution.css";

function Solution() {
    const { id } = useParams();
    const [evaluate, { data: response, isLoading, error }] =
        useEvaluateProblemMutation();

    useEffect(() => {
        if (id) {
            evaluate(id);
        }
    }, [id, evaluate]);

    if (isLoading)
        return (
            <div className="solution-container">
                Evaluating your solution...
            </div>
        );
    if (error)
        return (
            <div className="solution-container">
                Error: {error.message || "Failed to evaluate"}
            </div>
        );
    if (!response || !response.OK)
        return (
            <div className="solution-container">
                Failed to get evaluation results.
            </div>
        );

    const submission = response.data.submission || response.data;

    return (
        <div className="solution-container">
            <h1 className="solution-title">Evaluation Result</h1>

            <section className="solution-section">
                <h2>Performance Summary</h2>
                <div className="summary-stats">
                    <span>
                        <strong>AI Base Score:</strong> {submission.aiBaseScore}
                    </span>
                    <span>
                        <strong>Hints Used:</strong> {submission.hintsUsed}
                    </span>
                    <span>
                        <strong>Penalty:</strong> -{submission.penaltyApplied}
                    </span>
                </div>
                <div className="final-score">
                    <strong>Final Score: {submission.finalScore} / 100</strong>
                </div>
            </section>

            <section className="solution-section">
                <h2>AI Feedback</h2>
                <div className="feedback-item">
                    <strong className="feedback-label">Strengths:</strong>
                    <p className="feedback-text">
                        {submission.feedback?.strengths}
                    </p>
                </div>
                <div className="feedback-item">
                    <strong className="feedback-label">
                        Areas for Improvement:
                    </strong>
                    <p className="feedback-text">
                        {submission.feedback?.weaknesses}
                    </p>
                </div>
                <div className="feedback-item">
                    <strong className="feedback-label">
                        Actionable Advice:
                    </strong>
                    <p className="feedback-text">
                        {submission.feedback?.howToImprove}
                    </p>
                </div>
            </section>

            {submission.thinkingPatterns &&
                submission.thinkingPatterns.length > 0 && (
                    <section className="solution-section">
                        <h2>Thinking Patterns Identified</h2>
                        <div className="tags-container">
                            {submission.thinkingPatterns.map(
                                (pattern, index) => (
                                    <span key={index} className="mistake-tag">
                                        {pattern}
                                    </span>
                                ),
                            )}
                        </div>
                    </section>
                )}

            {submission.expertComparison && (
                <section className="solution-section">
                    <h2>Expert Comparison</h2>
                    <div className="feedback-item">
                        <strong className="feedback-label">
                            Expert Understanding:
                        </strong>
                        <p className="feedback-text">
                            {submission.expertComparison.expertUnderstanding}
                        </p>
                    </div>
                    <div className="feedback-item">
                        <strong className="feedback-label">
                            Expert Reasoning Flow:
                        </strong>
                        <p className="feedback-text">
                            {submission.expertComparison.expertReasoningFlow}
                        </p>
                    </div>
                </section>
            )}

            {submission.mistakeTags && submission.mistakeTags.length > 0 && (
                <section className="solution-section">
                    <h2>Mistake Tags</h2>
                    <div className="tags-container">
                        {submission.mistakeTags.map((tag, index) => (
                            <span key={index} className="mistake-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default Solution;
