import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/home.css';

const FEATURES = [
  {
    icon: '📋',
    bg: '#eff6ff',
    title: 'Track Every Application',
    desc: 'Log job applications with company, role, date, and notes. Never lose track of where you applied.',
  },
  {
    icon: '📊',
    bg: '#f0fdf4',
    title: 'Visual Dashboard',
    desc: 'See your job search at a glance — total applications, status breakdown, and recent activity.',
  },
  {
    icon: '🔄',
    bg: '#faf5ff',
    title: 'Status Lifecycle',
    desc: 'Move applications through Applied → Interviewing → Technical Test → Offered or Rejected.',
  },
  {
    icon: '🔒',
    bg: '#fff7ed',
    title: 'Secure & Private',
    desc: 'Your data belongs to you. Sign in with Google or email — protected behind secure authentication.',
  },
];

const STATUSES = [
  { label: 'Applied',        color: '#3b82f6' },
  { label: 'Interviewing',   color: '#8b5cf6' },
  { label: 'Technical Test', color: '#f59e0b' },
  { label: 'Offered',        color: '#10b981' },
  { label: 'Rejected',       color: '#ef4444' },
  { label: 'Withdrawn',      color: '#6b7280' },
];

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* ── Navbar ── */}
      <nav className="home-nav">
        <Link to="/" className="home-nav-brand">
          <span className="home-nav-brand-icon">J</span>
          JobTracker
        </Link>
        <div className="home-nav-actions">
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-primary btn-sm">Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="home-nav-link">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div style={{ position: 'relative', width: '100%', maxWidth: '740px', margin: '0 auto' }}>
          <div className="hero-badge">✦ Free to use · No credit card needed</div>

          <h1 className="hero-title">
            Your job search,
            <br />
            <span className="hero-title-accent">organized at last.</span>
          </h1>

          <p className="hero-subtitle">
            JobTracker helps you log every application, monitor statuses, and stay on top of your job hunt — all in one clean dashboard.
          </p>

          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-hero-primary">
                Go to My Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-hero-primary">
                  Start Tracking Free →
                </Link>
                <Link to="/login" className="btn-hero-secondary">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Mock UI preview */}
          <div className="hero-visual">
            <div className="mock-stats">
              <div className="mock-stat">
                <span className="mock-stat-num">24</span>
                <span className="mock-stat-label">Applied</span>
              </div>
              <div className="mock-stat">
                <span className="mock-stat-num">6</span>
                <span className="mock-stat-label">Interviewing</span>
              </div>
              <div className="mock-stat">
                <span className="mock-stat-num">2</span>
                <span className="mock-stat-label">Offered</span>
              </div>
            </div>
            <div className="mock-apps">
              <div className="mock-app-row">
                <div>
                  <div className="mock-app-company">Acme Corp</div>
                  <div className="mock-app-role">Senior Software Engineer</div>
                </div>
                <span className="mock-badge mock-badge-purple">Interviewing</span>
              </div>
              <div className="mock-app-row">
                <div>
                  <div className="mock-app-company">Globex Inc.</div>
                  <div className="mock-app-role">Full Stack Developer</div>
                </div>
                <span className="mock-badge mock-badge-amber">Tech Test</span>
              </div>
              <div className="mock-app-row">
                <div>
                  <div className="mock-app-company">Initech</div>
                  <div className="mock-app-role">Backend Engineer</div>
                </div>
                <span className="mock-badge mock-badge-green">Offered</span>
              </div>
              <div className="mock-app-row">
                <div>
                  <div className="mock-app-company">Umbrella LLC</div>
                  <div className="mock-app-role">DevOps Engineer</div>
                </div>
                <span className="mock-badge mock-badge-blue">Applied</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features">
        <p className="section-eyebrow">Features</p>
        <h2 className="section-title">Everything you need to land the job</h2>
        <p className="section-subtitle">
          Simple, focused tools built for job seekers who want clarity over chaos.
        </p>
        <div className="features-grid">
          {FEATURES.map(({ icon, bg, title, desc }) => (
            <div key={title} className="feature-card">
              <div className="feature-icon" style={{ background: bg }}>{icon}</div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="how-it-works">
        <p className="section-eyebrow">How It Works</p>
        <h2 className="section-title">Up and running in minutes</h2>
        <p className="section-subtitle">Three steps to a clearer job search.</p>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3 className="step-title">Create your account</h3>
            <p className="step-desc">
              Sign up with your email or continue with Google. It's free — no credit card required.
            </p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3 className="step-title">Add your applications</h3>
            <p className="step-desc">
              Log the company, role, application date, and any notes. Add as many as you need.
            </p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3 className="step-title">Track your progress</h3>
            <p className="step-desc">
              Update statuses as things move forward. Your dashboard gives you the full picture instantly.
            </p>
          </div>
        </div>
      </section>

      {/* ── Status Showcase ── */}
      <section className="status-showcase">
        <p className="section-eyebrow" style={{ color: '#60a5fa' }}>Application Statuses</p>
        <h2 className="section-title">Every stage, covered</h2>
        <p className="section-subtitle">
          Track where each application stands across the full hiring lifecycle.
        </p>
        <div className="status-pills">
          {STATUSES.map(({ label, color }) => (
            <div key={label} className="status-pill">
              <span className="status-dot" style={{ background: color }} />
              <span className="status-pill-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-box">
          <h2 className="cta-title">Ready to take control of your job search?</h2>
          <p className="cta-subtitle">
            Join job seekers who use JobTracker to stay organized, reduce anxiety, and land their next role faster.
          </p>
          <div className="cta-actions">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-cta-primary">Go to My Dashboard →</Link>
            ) : (
              <>
                <Link to="/register" className="btn-cta-primary">Get Started Free →</Link>
                <Link to="/login" className="btn-cta-secondary">Sign In</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="home-footer">
        <p>© {new Date().getFullYear()} JobTracker · Built to help you land the job.</p>
      </footer>
    </div>
  );
}
