import { useNavigate, Link } from "react-router-dom";
import { useGetMeQuery } from "../../services/authAPI";
import { useGetUserDashboardQuery } from "../../services/userAPI";
import { useEffect } from "react";
import "./Home.css";
import DashboardStats from "./components/DashboardStats";
import Submissions from "./components/Submissons";

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
                <h1 className="home-title">Welcome Home!</h1>
                <DashboardStats stats={stats}></DashboardStats>
                <Submissions submissions={submissions}></Submissions>
            </div>
        </section>
    )
}

export default Home;
