import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="footer">
    <div className="container footer-inner">
      <div><Link to="/" className="brand footer-brand"><span className="brand-mark">C</span><span>Ceylon<span>Gig</span></span></Link><p>Local talent. Island-wide.</p></div>
      <div className="footer-links"><Link to="/search">Explore work</Link><Link to="/register">Become a seller</Link><Link to="/wallet">Wallet</Link></div>
      <small>© {new Date().getFullYear()} CeylonGig · Made for Sri Lanka</small>
    </div>
  </footer>;
}
