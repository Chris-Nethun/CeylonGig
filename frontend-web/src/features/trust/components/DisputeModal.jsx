import { useState } from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import axiosClient from '../../../api/axiosClient';
import { useNotifications } from '../../../context/NotificationContext';

export default function DisputeModal({ orderId, onClose }) {
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const { notify } = useNotifications();
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    try {
      await axiosClient.post(`/orders/${encodeURIComponent(orderId)}/disputes`, { reason });
      notify('Your dispute has been submitted for review.');
      onClose();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not submit your dispute. Please try again.');
    } finally { setBusy(false); }
  }
  return <Modal title="Request a review" onClose={onClose}><form className="form-grid" onSubmit={submit}><p className="muted">Tell our support team what happened. They’ll review the project details and get back to you.</p><label className="form-field">What can we help with?<textarea value={reason} onChange={(event) => setReason(event.target.value)} rows="4" maxLength="2000" required minLength="20" placeholder="Describe the issue and the outcome you’re hoping for." /></label>{error && <div className="notice">{error}</div>}<Button type="submit" disabled={busy}>{busy ? 'Sending request…' : 'Send to support'}</Button></form></Modal>;
}
