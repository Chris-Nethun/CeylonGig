import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  return <header className="navbar">
    <div className="container nav-inner">
      <Link to="/" className="brand" aria-label="CeylonGig home"><span className="brand-mark">C</span><span>Ceylon<span>Gig</span></span></Link>
      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/search">Explore gigs</NavLink>
        {isAuthenticated && <NavLink to="/orders">My orders</NavLink>}
        {isAuthenticated && <NavLink to="/messages">Messages</NavLink>}
      </nav>
      <div className="nav-actions">
        {isAuthenticated ? <><Link className="nav-user" to="/profile">{user?.name || user?.email || 'My account'}</Link><button className="button button-outline button-small" onClick={logout}>Sign out</button></>
          : <><Link className="nav-login" to="/login">Log in</Link><Link className="button button-small" to="/register">Join CeylonGig</Link></>}
      </div>
    </div>
  </header>;
}
