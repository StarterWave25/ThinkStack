import { Link } from "react-router-dom";
function Submissions({ submissions }) {
    return (
        <div className="submissions-history">
            <h2 className="section-heading">Your Submissions</h2>
            {submissions.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-icon">🚀</span>
                    <p>No submissions found yet. Start solving problems!</p>
                </div>
            ) : (
                <div className="submissions-list">
                    {submissions.map((sub) => (
                        <Link to={`/solution/${sub.problemId}`} key={sub._id} className="submission-card-link">
                            <div className="submission-item">
                                <div className="submission-card-header">
                                    <span className="sub-title">{sub.problemTitle || "Unknown Problem"}</span>
                                    <span className={`sub-difficulty difficulty-${sub.difficulty?.toLowerCase()}`}>
                                        {sub.difficulty || "Unknown"}
                                    </span>
                                </div>

                                <div className="submission-card-body">
                                    <div className="sub-stat">
                                        <span className="stat-label">Solved on</span>
                                        <span className="stat-data">{new Date(sub.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="sub-stat">
                                        <span className="stat-label">Final Score</span>
                                        <span className="stat-data highlight">{sub.finalScore}/100</span>
                                    </div>
                                </div>

                                <div className="submission-card-footer">
                                    <span className="view-text">Review Solution</span>
                                    <span className="view-arrow">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>)}
        </div>
    );
}

export default Submissions;
