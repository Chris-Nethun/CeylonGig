import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GigCard from '../components/GigCard';
import GuideWizard from '../components/GuideWizard';

const featuredGigs = [
  { id: 'brand-design', title: 'I will shape a memorable brand identity for your business', seller: 'Kavindi Perera', category: 'Brand & design', rating: 5, reviews: 86, price: 'LKR 12,500', color: '#b0bb9d', icon: '✳', verified: true },
  { id: 'websites', title: 'I will build a clean, fast website for your next big idea', seller: 'Nuwan Jayasuriya', category: 'Web & tech', rating: 4.9, reviews: 52, price: 'LKR 25,000', color: '#dedfda', icon: '⌘', verified: true },
  { id: 'copywriting', title: 'I will write warm, clear copy that sounds just like you', seller: 'Mali Fernando', category: 'Writing', rating: 4.9, reviews: 41, price: 'LKR 7,500', color: '#e9c9a9', icon: 'Aa' },
  { id: 'photography', title: 'I will capture thoughtful photos for your brand or event', seller: 'Dilan Silva', category: 'Photography', rating: 5, reviews: 33, price: 'LKR 15,000', color: '#9db9a9', icon: '◉' }
];
const categories = [['✳', 'Design & creative', 'Branding, illustration, UI'], ['⌘', 'Web & technology', 'Websites, apps, data'], ['Aa', 'Writing & translation', 'Words that work for you'], ['◉', 'Photo & video', 'Stories in every frame'], ['↗', 'Marketing', 'Grow your next big idea'], ['♫', 'Music & audio', 'Sound, voice and production']];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  function search(event) { event.preventDefault(); navigate(`/search?q=${encodeURIComponent(query)}`); }
  return <>
    <section className="hero"><div className="container hero-grid">
      <div className="hero-copy"><span className="hero-kicker"><span /> THE ISLAND'S CREATIVE MARKETPLACE</span><h1>Good work.<br /><em>Good people.</em><br />Right here.</h1><p>Find independent talent across Sri Lanka, ready to help bring your next idea to life.</p>
        <form className="hero-search" onSubmit={search}><span>⌕</span><input aria-label="Search services" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “brand identity” or “build a website”" /><button className="button button-accent">Find a gig</button></form>
        <div className="popular-searches"><span>Popular:</span>{['Logo design', 'Social media', 'Web development'].map((term) => <button key={term} onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}>{term}</button>)}</div>
      </div>
      <div className="hero-art" aria-label="A local creative marketplace illustration"><div className="hero-sticker sticker-top">Made on the island <span>✳</span></div><div className="hero-poster"><div className="poster-sun" /><div className="poster-mountain mountain-one" /><div className="poster-mountain mountain-two" /><div className="poster-caption">Ideas grow<br />better together.</div><div className="poster-leaf">〰</div></div><div className="hero-sticker sticker-bottom"><span>↗</span> Skills without borders</div><div className="hero-dot dot-one" /><div className="hero-dot dot-two" /></div>
    </div></section>
    <section className="container trust-strip"><div><strong>Made for Sri Lanka</strong><span>Local expertise, local understanding</span></div><div><strong>Secure payments</strong><span>Protected from start to finish</span></div><div><strong>Real people, real skills</strong><span>A community built on good work</span></div></section>
    <section className="section category-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">A little bit of everything</span><h2 className="section-title">Find your kind of talent.</h2><p className="muted">From the first sketch to the final details, the right people are here.</p></div><Link className="text-link" to="/search">See all services <span>→</span></Link></div><div className="category-grid">{categories.map(([icon, title, caption]) => <Link className="category-card" to={`/search?category=${encodeURIComponent(title)}`} key={title}><span className="category-icon">{icon}</span><strong>{title}</strong><span className="muted">{caption}</span><span className="category-arrow">↗</span></Link>)}</div></div></section>
    <section className="section featured-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">Handpicked for you</span><h2 className="section-title">Good work, worth a look.</h2><p className="muted">A few local favorites to get you started.</p></div><Link className="text-link" to="/search">Explore all gigs <span>→</span></Link></div><div className="gig-grid">{featuredGigs.map((gig) => <GigCard key={gig.id} gig={gig} />)}</div></div></section>
    <section className="section guide-section"><div className="container guide-grid"><div><span className="eyebrow">Not quite sure yet?</span><h2 className="section-title">Let’s find the<br />right fit.</h2><p className="muted">Tell us a little about what you need. We’ll point you toward the right place to begin.</p><div className="guide-flourish">✳</div></div><GuideWizard /></div></section>
    <section className="cta-section"><div className="container cta-inner"><div><span className="eyebrow">For independent talent</span><h2>Your next client is closer than you think.</h2><p>Show the island what you do best. Your next chapter starts here.</p></div><Link to="/register" className="button button-accent">Share your skills <span>→</span></Link></div></section>
  </>;
}
