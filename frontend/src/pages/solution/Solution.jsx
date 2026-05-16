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

    if (isLoading) {
        return (
            <div className="solution-page">
                <div className="loading-container">
                    <div className="typing-text">Analyzing your performance...</div>
                </div>
            </div>
        );
    }
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
        <div className="solution-page">
            <div className="solution-container first-container">
                <div className="unified-card">
                    <div className="score-main">
                        <span className="score-value">{submission.finalScore}</span>
                        <span className="score-total">/ 100</span>
                    </div>
                    <p className="score-label">Overall Thinking Performance</p>
                    
                    <div className="score-breakdown">
                        <div className="breakdown-item">
                            <span className="item-label">AI Base</span>
                            <span className="item-value">{submission.aiBaseScore}</span>
                        </div>
                        <div className="breakdown-divider"></div>
                        <div className="breakdown-item">
                            <span className="item-label">Hints Used</span>
                            <span className="item-value">{submission.hintsUsed}</span>
                        </div>
                        <div className="breakdown-divider"></div>
                        <div className="breakdown-item">
                            <span className="item-label">Penalty</span>
                            <span className="item-value">-{submission.penaltyApplied}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="solution-container second-container">
                <div className="unified-card content-card">
                    <section className="unified-section">
                        <h2 className="card-title">AI Feedback</h2>
                        <div className="feedback-content">
                            <div className="feedback-group positive">
                                <h3>Strengths</h3>
                                <p>{submission.feedback?.strengths}</p>
                            </div>
                            <div className="feedback-group negative">
                                <h3>Areas for Improvement</h3>
                                <p>{submission.feedback?.weaknesses}</p>
                            </div>
                            <div className="feedback-group actionable">
                                <h3>Actionable Advice</h3>
                                <p>{submission.feedback?.howToImprove}</p>
                            </div>
                        </div>
                    </section>

                    <div className="section-divider"></div>

                    <section className="unified-section">
                        <h2 className="card-title">Expert Comparison</h2>
                        <div className="comparison-content">
                            <div className="comparison-item">
                                <h3>Understanding</h3>
                                <p>{submission.expertComparison?.expertUnderstanding}</p>
                            </div>
                            <div className="comparison-item">
                                <h3>Reasoning Flow</h3>
                                <p>{submission.expertComparison?.expertReasoningFlow}</p>
                            </div>
                        </div>
                    </section>

                    {(submission.thinkingPatterns?.length > 0 || submission.mistakeTags?.length > 0) && (
                        <>
                            <div className="section-divider"></div>
                            <section className="unified-section">
                                {submission.thinkingPatterns?.length > 0 && (
                                    <div className="tags-group">
                                        <h2 className="card-title">Thinking Patterns</h2>
                                        <div className="tags-container">
                                            {submission.thinkingPatterns.map((pattern, index) => (
                                                <span key={index} className="tag pattern-tag">
                                                    {pattern}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {submission.mistakeTags?.length > 0 && (
                                    <div className="tags-group" style={{ marginTop: '1.5rem' }}>
                                        <h2 className="card-title">Mistake Analysis</h2>
                                        <div className="tags-container">
                                            {submission.mistakeTags.map((tag, index) => (
                                                <span key={index} className="tag mistake-tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </section>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Solution;
