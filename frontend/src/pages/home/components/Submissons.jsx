import { Link } from "react-router-dom";

function Submissions({ submissions }) {
    return <div className="submissions-history">
        <h2>Your Submissions</h2>
        {submissions.length === 0 ? (
            <p>No submissions found yet. Start solving problems!</p>
        ) : (
            <div className="submissions-list">
                {submissions.map((sub) => (
                    <div key={sub._id} className="submission-item">
                        <div className="submission-info">
                            <span className="sub-date">{new Date(sub.createdAt).toLocaleDateString()}</span>
                            <span className="sub-title"><strong>{sub.problemTitle || "Unknown Problem"}</strong></span>
                            <span className="sub-score">Score: {sub.finalScore}</span>
                        </div>
                        <Link to={`/solution/${sub.problemId}`} className="view-link">View Details</Link>
                    </div>
                ))}
            </div>
        )}
    </div>;
}

export default Submissions;