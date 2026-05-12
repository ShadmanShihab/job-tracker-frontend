import React from 'react';
import '../styles/status.css';

const STATUS_CONFIG = {
  APPLIED: { label: 'Applied', className: 'status-applied' },
  INTERVIEWING: { label: 'Interviewing', className: 'status-interviewing' },
  TECHNICAL_TEST: { label: 'Technical Test', className: 'status-technical' },
  OFFERED: { label: 'Offered', className: 'status-offered' },
  REJECTED: { label: 'Rejected', className: 'status-rejected' },
  WITHDRAWN: { label: 'Withdrawn', className: 'status-withdrawn' },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || { label: status, className: '' };
  return <span className={`status-badge ${config.className}`}>{config.label}</span>;
}
