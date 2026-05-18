function DashboardStats({ stats }) {

    return <div className="dashboard-stats">
        <div className="dashboard-stat-card">
            <h3 className="dashboard-stat-label">Total Solved</h3>
            <h2 className="dashboard-stat-value">{stats.totalSolved}</h2>
        </div>
        <div className="dashboard-stat-card">
            <h3 className="dashboard-stat-label">Average Score</h3>
            <h2 className="dashboard-stat-value">{stats.averageScore?.toFixed(1) || 0}</h2>
        </div>
        <div className="dashboard-stat-card">
            <h3 className="dashboard-stat-label">Hints Used</h3>
            <h2 className="dashboard-stat-value">{stats.totalHintsUsed}</h2>
        </div>
    </div>;
}

export default DashboardStats;