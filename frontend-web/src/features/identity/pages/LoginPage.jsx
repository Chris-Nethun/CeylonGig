import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return <section className="auth-page">
    <div className="auth-art"><span className="eyebrow">Good work, close to home</span><h1>Your next great collaboration starts here.</h1><p>Meet independent talent from every corner of Sri Lanka.</p><div className="auth-art-orbit">✳</div></div>
    <div className="auth-panel"><div className="auth-card"><span className="eyebrow">Welcome back</span><h2>Log in to CeylonGig</h2><p className="muted">Pick up where you left off.</p><LoginForm /><Link className="back-link" to="/">← Back to marketplace</Link></div></div>
  </section>;
}
