import { useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../../services/authAPI";
import { useGetUserDashboardQuery } from "../../services/userAPI";
import DashboardStats from "./components/DashboardStats";
import Submissions from "./components/Submissons";
import "./styles/Home.css";
import "./styles/Dashboard.css";
import "./styles/Submission.css";
import { useEffect } from "react";

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
    } = useGetUserDashboardQuery(undefined, { skip: !userData });

    const isLoggedIn = !!userData;

    useEffect(() => {
        if (!isUserLoading && !isUserFetching && !isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, isUserLoading, isUserFetching, navigate]);

    if (isUserLoading || isDashboardLoading) {
        return (
            <div className="home-page">
                <div className="bg-bubbles">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className={`bubble bubble-${i + 1}`}></div>
                    ))}
                </div>
                <div className="loading-container">
                    <div className="typing-text">Loading dashboard...</div>
                </div>
            </div>
        );
    }

    const dashboardData = dashboardResponse?.data?.[0];
    const stats = dashboardData?.stats?.[0] || { totalSolved: 0, averageScore: 0, totalHintsUsed: 0 };
    const submissions = dashboardData?.submissions || [];

    return (
        <section className="home-page">
            <div className="bg-bubbles">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className={`bubble bubble-${i + 1}`}></div>
                ))}
            </div>
            <div className="home-container first-container">
                <div className="home-card welcome-card">
                    <h1 className="home-title">Welcome {userData?.data?.firstName || 'User'}!</h1>
                    <h2 className="section-heading">Performance Overview</h2>
                    <DashboardStats stats={stats}></DashboardStats>
                </div>
            </div>

            <div className="home-container second-container">
                <div className="home-card submissions-card">
                    <Submissions submissions={submissions}></Submissions>
                </div>
            </div>
        </section>
    )
}

export default Home;