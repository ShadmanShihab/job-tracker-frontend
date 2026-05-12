import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { applicationsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';
import '../styles/detail.css';

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationsAPI.getById(id)
      .then(({ data }) => setApp(data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this application? This cannot be undone.')) return;
    await applicationsAPI.delete(id);
    navigate('/applications');
  };

  if (loading) return <div className="page"><Navbar /><div className="loading">Loading...</div></div>;
  if (!app) return <div className="page"><Navbar /><p className="error-msg">Application not found.</p></div>;

  return (
    <div className="page">
      <Navbar />
      <main className="main-content">
        <div className="detail-header">
          <div>
            <h1>{app.positionTitle}</h1>
            <p className="company-name">{app.companyName}</p>
          </div>
          <div className="detail-actions">
            <Link to={`/applications/${id}/edit`} className="btn btn-secondary">Edit</Link>
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-card">
            <h3>Status & Details</h3>
            <div className="detail-row">
              <span className="detail-label">Status</span>
              <StatusBadge status={app.status} />
            </div>
            {app.workLocation && (
              <div className="detail-row">
                <span className="detail-label">Work Location</span>
                <span>{app.workLocation}</span>
              </div>
            )}
            {app.dateApplied && (
              <div className="detail-row">
                <span className="detail-label">Date Applied</span>
                <span>{new Date(app.dateApplied).toLocaleDateString()}</span>
              </div>
            )}
            {app.salaryExpectation && (
              <div className="detail-row">
                <span className="detail-label">Salary Expectation</span>
                <span>${Number(app.salaryExpectation).toLocaleString()}</span>
              </div>
            )}
            {app.jobPostUrl && (
              <div className="detail-row">
                <span className="detail-label">Job Post</span>
                <a href={app.jobPostUrl} target="_blank" rel="noreferrer">View Posting</a>
              </div>
            )}
          </div>

          {(app.contactPersonName || app.contactPersonEmail) && (
            <div className="detail-card">
              <h3>Contact</h3>
              {app.contactPersonName && (
                <div className="detail-row">
                  <span className="detail-label">Name</span>
                  <span>{app.contactPersonName}</span>
                </div>
              )}
              {app.contactPersonEmail && (
                <div className="detail-row">
                  <span className="detail-label">Email</span>
                  <a href={`mailto:${app.contactPersonEmail}`}>{app.contactPersonEmail}</a>
                </div>
              )}
            </div>
          )}
        </div>

        {app.requiredSkills?.length > 0 && (
          <div className="detail-section">
            <h3>Required Skills</h3>
            <div className="skills-list">
              {app.requiredSkills.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {app.jobDescription && (
          <div className="detail-section">
            <h3>Job Description</h3>
            <pre className="description-text">{app.jobDescription}</pre>
          </div>
        )}

        {app.notes && (
          <div className="detail-section">
            <h3>Notes</h3>
            <pre className="description-text">{app.notes}</pre>
          </div>
        )}

        {app.cvFileUrl && (
          <div className="detail-section">
            <h3>CV / Resume</h3>
            <a href={app.cvFileUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
              View CV (PDF)
            </a>
          </div>
        )}

        {app.screenshotUrls?.length > 0 && (
          <div className="detail-section">
            <h3>Screenshots</h3>
            <div className="screenshots-grid">
              {app.screenshotUrls.map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noreferrer">
                  <img src={url} alt={`Screenshot ${i + 1}`} className="screenshot-thumb" />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="detail-footer">
          <span>Created: {app.createdAt ? new Date(app.createdAt).toLocaleString() : 'N/A'}</span>
          <span>Updated: {app.updatedAt ? new Date(app.updatedAt).toLocaleString() : 'N/A'}</span>
        </div>
      </main>
    </div>
  );
}
