import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import KycUploadForm from '../components/KycUploadForm';

export default function ProfilePage() {
  const { user } = useAuth();
  return <section className="container section">
    <span className="eyebrow">Your account</span><h1 className="section-title">Good to see you, {user?.name || 'there'}.</h1>
    <div className="profile-grid">
      <article className="panel profile-card"><div className="avatar">{(user?.name || user?.email || 'C').charAt(0).toUpperCase()}</div><h2>{user?.name || 'CeylonGig member'}</h2><p className="muted">{user?.email}</p><Badge>{user?.role || 'Member'}</Badge><div className="profile-links"><Link to="/orders">View your orders →</Link><Link to="/messages">Open messages →</Link><Link to="/wallet">Wallet and payments →</Link></div></article>
      <article className="panel"><span className="eyebrow">Trust & safety</span><h2>Verify your identity</h2><p className="muted">A verified profile helps build trust with clients and freelancers.</p><KycUploadForm /></article>
    </div>
    <div className="profile-actions"><Link className="button button-accent" to="/gigs/create">Create a gig</Link><Link className="button button-outline" to="/admin/users">User administration</Link><Link className="button button-outline" to="/admin/disputes">Disputes</Link></div>
  </section>;
}
