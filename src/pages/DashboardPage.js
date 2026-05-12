import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/dashboard.css';

const STATUS_COLORS = {
  APPLIED: '#3b82f6',
  INTERVIEWING: '#8b5cf6',
  TECHNICAL_TEST: '#f59e0b',
  OFFERED: '#10b981',
  REJECTED: '#ef4444',
  WITHDRAWN: '#6b7280',
};

const STATUS_LABELS = {
  APPLIED: 'Applied',
  INTERVIEWING: 'Interviewing',
  TECHNICAL_TEST: 'Technical Test',
  OFFERED: 'Offered',
  REJECTED: 'Rejected',
  WITHDRAWN: 'Withdrawn',
};

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    dashboardAPI.get()
      .then(({ data }) => setDashboard(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <Navbar />
      <main className="main-content">
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.name || 'there'}!</h1>
            <p>Here's your job search overview</p>
          </div>
          <Link to="/applications/new" className="btn btn-primary">
            + Add Application
          </Link>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : dashboard ? (
          <>
            <div className="stat-card total">
              <span className="stat-number">{dashboard.totalApplications}</span>
              <span className="stat-label">Total Applications</span>
            </div>

            <div className="status-grid">
              {Object.entries(dashboard.countByStatus).map(([status, count]) => (
                <Link
                  key={status}
                  to={`/applications?status=${status}`}
                  className="status-card"
                  style={{ '--status-color': STATUS_COLORS[status] }}
                >
                  <span className="status-count">{count}</span>
                  <span className="status-name">{STATUS_LABELS[status]}</span>
                </Link>
              ))}
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
