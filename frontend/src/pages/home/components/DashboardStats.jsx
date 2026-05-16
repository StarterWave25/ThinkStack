function DashboardStats({ stats }) {

    return <div className="dashboard-stats">
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
    </div>;
}

export default DashboardStats;