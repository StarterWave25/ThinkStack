import { useNavigate, Link } from "react-router-dom";
import { useGetMeQuery } from "../services/authAPI";
import { useGetUserDashboardQuery } from "../services/userAPI";
import { useEffect } from "react";
import "./styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const {
    data: userData,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useGetMeQuery();

  const {
    data: dashboardResponse,
    isLoading: isDashboardLoading,
    error: dashboardError
  } = useGetUserDashboardQuery(undefined, { skip: !userData });

  const isLoggedIn = !!userData;

  useEffect(() => {
    if (!isUserLoading && !isUserFetching && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, isUserLoading, isUserFetching, navigate]);

  if (isUserLoading || isDashboardLoading) return <div className="home-page">Loading dashboard...</div>;

  const dashboardData = dashboardResponse?.data?.[0];
  const stats = dashboardData?.stats?.[0] || { totalSolved: 0, averageScore: 0, totalHintsUsed: 0 };
  const submissions = dashboardData?.submissions || [];

  console.log(submissions)

  return (
    <section className="home-page">
      <div className="home-content">
        <h1 className="home-title">Welcome Home</h1>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-label">Total Solved</span>
            <span className="stat-value">{stats.totalSolved}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Average Score</span>
            <span className="stat-value">{stats.averageScore?.toFixed(1) || 0}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Hints Used</span>
            <span className="stat-value">{stats.totalHintsUsed}</span>
          </div>
        </div>

        <div className="submissions-history">
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
        </div>
      </div>
    </section>
  )
}

export default Home;
