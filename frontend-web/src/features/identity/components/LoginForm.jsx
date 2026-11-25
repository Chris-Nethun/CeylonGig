import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useNotifications } from '../../../context/NotificationContext';
import Button from '../../../components/common/Button';

export default function LoginForm() {
  const { login } = useAuth();
  const { notify } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(Object.fromEntries(new FormData(event.currentTarget)));
      notify('Welcome back to CeylonGig.');
      navigate(location.state?.from?.pathname || '/profile', { replace: true });
    } catch (requestError) {
      const message = requestError.response?.data?.message || 'We could not sign you in. Check your details and try again.';
      setError(message);
      notify(message, 'error');
    } finally { setBusy(false); }
  }

  return <form className="form-grid" onSubmit={handleSubmit}>
    {error && <div className="notice" role="alert">{error}</div>}
    <label className="form-field">Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
    <label className="form-field">Password<input name="password" type="password" autoComplete="current-password" required minLength="8" placeholder="Your password" /></label>
    <Button type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Log in'}</Button>
    <p className="form-footnote">New to CeylonGig? <Link to="/register">Create an account</Link></p>
  </form>;
}
