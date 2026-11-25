import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';
import { useNotifications } from '../../../context/NotificationContext';
import { createGig } from '../services/gigApi';

export default function CreateGigPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { notify } = useNotifications();
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    try {
      const gig = await createGig(Object.fromEntries(new FormData(event.currentTarget)));
      notify('Your gig has been created.');
      navigate(`/gigs/${gig.id}`);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not publish your gig. Please try again.');
    } finally { setBusy(false); }
  }
  return <section className="container section narrow-page"><span className="eyebrow">Share what you do</span><h1 className="section-title">Create a new gig.</h1><p className="muted">Make it easy for clients to understand what you can help them with.</p>
    <form className="panel form-grid gig-create-form" onSubmit={submit}>
      {error && <div className="notice">{error}</div>}
      <label className="form-field">Gig title<input name="title" required minLength="12" maxLength="100" placeholder="I will help bring your idea to life" /></label>
      <label className="form-field">Category<select name="category" required defaultValue=""><option value="" disabled>Choose a category</option><option>Design & creative</option><option>Web & technology</option><option>Writing & translation</option><option>Photo & video</option><option>Marketing</option></select></label>
      <label className="form-field">Description<textarea name="description" rows="5" required minLength="30" placeholder="Describe what you offer and what clients can expect." /></label>
      <div className="two-fields"><label className="form-field">Starting price (LKR)<input name="price" type="number" min="500" step="100" required placeholder="5000" /></label><label className="form-field">Delivery time (days)<input name="deliveryDays" type="number" min="1" max="90" required placeholder="5" /></label></div>
      <Button type="submit" variant="accent" disabled={busy}>{busy ? 'Publishing…' : 'Publish gig'}</Button>
    </form>
  </section>;
}
