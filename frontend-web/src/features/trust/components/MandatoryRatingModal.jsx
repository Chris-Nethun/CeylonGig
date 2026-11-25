import { useState } from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import { submitRating } from '../services/ratingApi';
import { useNotifications } from '../../../context/NotificationContext';

export default function MandatoryRatingModal({ orderId, onClose, onSubmitted }) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const { notify } = useNotifications();
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    try {
      await submitRating(orderId, rating, review);
      notify('Thank you for sharing your experience.');
      onSubmitted?.();
      onClose();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Your rating could not be submitted. Please try again.');
    } finally { setBusy(false); }
  }
  return <Modal title="How did it go?" onClose={onClose}><form className="form-grid" onSubmit={submit}><p className="muted">Your feedback helps the CeylonGig community do its best work.</p><div className="star-picker" role="radiogroup" aria-label="Rating">{[1, 2, 3, 4, 5].map((value) => <button type="button" role="radio" aria-checked={rating === value} className={value <= rating ? 'active' : ''} onClick={() => setRating(value)} key={value}>★</button>)}</div><label className="form-field">A few words about your experience<textarea rows="3" maxLength="1000" value={review} onChange={(event) => setReview(event.target.value)} placeholder="What went well?" /></label>{error && <div className="notice">{error}</div>}<Button type="submit" disabled={busy}>{busy ? 'Sending…' : 'Submit rating'}</Button></form></Modal>;
}
