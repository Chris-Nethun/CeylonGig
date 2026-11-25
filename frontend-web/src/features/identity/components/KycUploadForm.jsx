import { useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import Button from '../../../components/common/Button';
import { useNotifications } from '../../../context/NotificationContext';

export default function KycUploadForm() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const { notify } = useNotifications();

  async function submit(event) {
    event.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('document', file);
    setBusy(true);
    try {
      await axiosClient.post('/users/me/verification', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      notify('Your verification document was submitted.');
    } catch (error) {
      notify(error.response?.data?.message || 'Could not submit the document. Please try again.', 'error');
    } finally { setBusy(false); }
  }

  return <form className="kyc-form" onSubmit={submit}>
    <label className="form-field">Identity document<input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(event) => setFile(event.target.files?.[0] || null)} required /></label>
    <p className="muted">Accepted formats: JPG, PNG or PDF. Your document is used only for account verification.</p>
    <Button type="submit" disabled={!file || busy}>{busy ? 'Uploading…' : 'Submit for verification'}</Button>
  </form>;
}
