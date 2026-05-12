import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { applicationsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';
import '../styles/applications.css';

const ALL_STATUSES = ['', 'APPLIED', 'INTERVIEWING', 'TECHNICAL_TEST', 'OFFERED', 'REJECTED', 'WITHDRAWN'];
const STATUS_LABELS = {
  '': 'All',
  APPLIED: 'Applied',
  INTERVIEWING: 'Interviewing',
  TECHNICAL_TEST: 'Technical Test',
  OFFERED: 'Offered',
  REJECTED: 'Rejected',
  WITHDRAWN: 'Withdrawn',
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeStatus = searchParams.get('status') || '';

  useEffect(() => {
    setLoading(true);
    applicationsAPI.getAll(activeStatus || undefined)
      .then(({ data }) => setApplications(data))
      .finally(() => setLoading(false));
  }, [activeStatus]);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    if (!window.confirm('Delete this application?')) return;
    await applicationsAPI.delete(id);
    setApplications(applications.filter(a => a.id !== id));
  };

  return (
    <div className="page">
      <Navbar />
      <main className="main-content">
        <div className="page-header">
          <h1>Applications</h1>
          <Link to="/applications/new" className="btn btn-primary">+ Add New</Link>
        </div>

        <div className="filter-tabs">
          {ALL_STATUSES.map(s => (
            <button
              key={s}
              className={`filter-tab ${activeStatus === s ? 'active' : ''}`}
              onClick={() => setSearchParams(s ? { status: s } : {})}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="empty-state">
            <p>No applications found.</p>
            <Link to="/applications/new" className="btn btn-primary">Add your first application</Link>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map(app => (
              <Link key={app.id} to={`/applications/${app.id}`} className="application-card">
                <div className="card-main">
                  <div className="card-info">
                    <h3>{app.positionTitle}</h3>
                    <p className="company">{app.companyName}</p>
                    {app.workLocation && <span className="location-badge">{app.workLocation}</span>}
                  </div>
                  <div className="card-meta">
                    <StatusBadge status={app.status} />
                    {app.dateApplied && (
                      <span className="date">{new Date(app.dateApplied).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                {app.requiredSkills?.length > 0 && (
                  <div className="skills-preview">
                    {app.requiredSkills.slice(0, 4).map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                    {app.requiredSkills.length > 4 && <span className="skill-tag">+{app.requiredSkills.length - 4}</span>}
                  </div>
                )}
                <button
                  className="btn btn-danger btn-sm card-delete"
                  onClick={(e) => handleDelete(app.id, e)}
                >
                  Delete
                </button>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
