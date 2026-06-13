import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { applicationsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import '../styles/form.css';

const STATUSES = ['APPLIED', 'INTERVIEWING', 'TECHNICAL_TEST', 'OFFERED', 'REJECTED', 'WITHDRAWN'];
const LOCATIONS = ['REMOTE', 'HYBRID', 'ONSITE'];

const emptyForm = {
  companyName: '',
  positionTitle: '',
  jobPostUrl: '',
  jobDescription: '',
  requiredSkills: '',
  status: 'APPLIED',
  dateApplied: '',
  salaryExpectation: '',
  workLocation: '',
  contactPersonName: '',
  contactPersonEmail: '',
  notes: '',
};

export default function ApplicationFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [cvFile, setCvFile] = useState(null);
  const [existingCvUrl, setExistingCvUrl] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    applicationsAPI.getById(id).then(({ data }) => {
      setForm({
        companyName: data.companyName || '',
        positionTitle: data.positionTitle || '',
        jobPostUrl: data.jobPostUrl || '',
        jobDescription: data.jobDescription || '',
        requiredSkills: data.requiredSkills?.join(', ') || '',
        status: data.status || 'APPLIED',
        dateApplied: data.dateApplied || '',
        salaryExpectation: data.salaryExpectation || '',
        workLocation: data.workLocation || '',
        contactPersonName: data.contactPersonName || '',
        contactPersonEmail: data.contactPersonEmail || '',
        notes: data.notes || '',
      });
      if (data.cvFileUrl) setExistingCvUrl(data.cvFileUrl);
    });
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = {
      ...form,
      requiredSkills: form.requiredSkills
        ? form.requiredSkills.split(',').map(s => s.trim()).filter(Boolean)
        : [],
      salaryExpectation: form.salaryExpectation ? parseFloat(form.salaryExpectation) : null,
      workLocation: form.workLocation || null,
      dateApplied: form.dateApplied || null,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (cvFile) formData.append('cv', cvFile);
    screenshots.forEach(f => formData.append('screenshots', f));

    try {
      if (isEdit) {
        await applicationsAPI.update(id, formData);
      } else {
        await applicationsAPI.create(formData);
      }
      navigate('/applications');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Navbar />
      <main className="main-content">
        <div className="page-header">
          <h1>{isEdit ? 'Edit Application' : 'New Application'}</h1>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="app-form">
          <section className="form-section">
            <h2>Basic Info</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Company Name *</label>
                <input name="companyName" value={form.companyName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Position Title *</label>
                <input name="positionTitle" value={form.positionTitle} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Status *</label>
                <select name="status" value={form.status} onChange={handleChange} required>
                  {STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Work Location</label>
                <select name="workLocation" value={form.workLocation} onChange={handleChange}>
                  <option value="">Select...</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date Applied</label>
                <input type="date" name="dateApplied" value={form.dateApplied} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Salary Expectation</label>
                <input type="number" name="salaryExpectation" value={form.salaryExpectation} onChange={handleChange} placeholder="e.g. 80000" />
              </div>
            </div>
            <div className="form-group">
              <label>Job Post URL</label>
              <input type="url" name="jobPostUrl" value={form.jobPostUrl} onChange={handleChange} />
            </div>
          </section>

          <section className="form-section">
            <h2>Job Details</h2>
            <div className="form-group">
              <label>Job Description</label>
              <textarea name="jobDescription" value={form.jobDescription} onChange={handleChange} rows={5} />
            </div>
            <div className="form-group">
              <label>Required Skills (comma-separated)</label>
              <input name="requiredSkills" value={form.requiredSkills} onChange={handleChange} placeholder="React, Node.js, PostgreSQL" />
            </div>
          </section>

          <section className="form-section">
            <h2>Contact</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Contact Person Name</label>
                <input name="contactPersonName" value={form.contactPersonName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Contact Person Email</label>
                <input type="email" name="contactPersonEmail" value={form.contactPersonEmail} onChange={handleChange} />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Notes</h2>
            <div className="form-group">
              <label>Notes</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={4} />
            </div>
          </section>

          <section className="form-section">
            <h2>Files</h2>
            <div className="form-group">
              <label>CV / Resume (PDF)</label>
              {isEdit && existingCvUrl && (
                <div className="form-hint">
                  Current CV: <a href={existingCvUrl} target="_blank" rel="noreferrer">View uploaded CV</a>
                  {' — upload a new file below to replace it'}
                </div>
              )}
              <input type="file" accept=".pdf" onChange={(e) => setCvFile(e.target.files[0])} />
            </div>
            <div className="form-group">
              <label>Job Screenshots (Images)</label>
              <input type="file" accept="image/*" multiple onChange={(e) => setScreenshots(Array.from(e.target.files))} />
              {isEdit && <span className="form-hint">Upload new images to replace existing screenshots</span>}
            </div>
          </section>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Application'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
