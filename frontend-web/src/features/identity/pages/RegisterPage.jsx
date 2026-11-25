import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../context/AuthContext';
import { useNotifications } from '../../../context/NotificationContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const { notify } = useNotifications();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    if (fields.password !== fields.confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }
    delete fields.confirmPassword;
    setBusy(true);
    setError('');
    try {
      await register(fields);
      notify('Your account is ready. Welcome!');
      navigate('/profile', { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'We could not create your account. Please try again.');
    } finally { setBusy(false); }
  }

  return <section className="auth-page">
    <div className="auth-art"><span className="eyebrow">Your skills have a home</span><h1>Make good things happen, together.</h1><p>Build your reputation, meet new clients and grow your work on your terms.</p><div className="auth-art-orbit">✳</div></div>
    <div className="auth-panel"><div className="auth-card"><span className="eyebrow">Join the community</span><h2>Create your account</h2><p className="muted">One account for buyers and sellers.</p>
      <form className="form-grid" onSubmit={submit}>
        {error && <div className="notice" role="alert">{error}</div>}
        <label className="form-field">Full name<input name="name" autoComplete="name" required minLength="2" placeholder="Your name" /></label>
        <label className="form-field">Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
        <label className="form-field">I want to<select name="role" defaultValue="BUYER"><option value="BUYER">Hire independent talent</option><option value="SELLER">Offer my services</option><option value="BOTH">Do both</option></select></label>
        <label className="form-field">Password<input name="password" type="password" autoComplete="new-password" minLength="8" required placeholder="At least 8 characters" /></label>
        <label className="form-field">Confirm password<input name="confirmPassword" type="password" autoComplete="new-password" minLength="8" required placeholder="Enter your password again" /></label>
        <Button type="submit" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</Button>
      </form>
      <p className="form-footnote">Already a member? <Link to="/login">Log in</Link></p>
    </div></div>
  </section>;
}
