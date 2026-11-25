import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GigCard from '../components/GigCard';
import Loader from '../../../components/common/Loader';
import { getGigs } from '../services/gigApi';

const examples = [
  { id: 'brand-design', title: 'I will shape a memorable brand identity for your business', seller: 'Kavindi Perera', category: 'Design & creative', rating: 5, reviews: 86, price: 'LKR 12,500', color: '#b0bb9d', icon: '✳', verified: true },
  { id: 'websites', title: 'I will build a clean, fast website for your next big idea', seller: 'Nuwan Jayasuriya', category: 'Web & technology', rating: 4.9, reviews: 52, price: 'LKR 25,000', color: '#dedfda', icon: '⌘', verified: true },
  { id: 'copywriting', title: 'I will write warm, clear copy that sounds just like you', seller: 'Mali Fernando', category: 'Writing & translation', rating: 4.9, reviews: 41, price: 'LKR 7,500', color: '#e9c9a9', icon: 'Aa' },
  { id: 'photography', title: 'I will capture thoughtful photos for your brand or event', seller: 'Dilan Silva', category: 'Photo & video', rating: 5, reviews: 33, price: 'LKR 15,000', color: '#9db9a9', icon: '◉' }
];

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const category = params.get('category') || '';
  const [gigs, setGigs] = useState(examples);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    getGigs({ q: query || undefined, category: category || undefined })
      .then((items) => { if (active && items.length) setGigs(items); })
      .catch(() => { if (active) setError('Showing sample services while the marketplace API is unavailable.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [query, category]);

  const filtered = useMemo(() => gigs.filter((gig) => {
    const text = `${gig.title} ${gig.category} ${gig.seller}`.toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (!category || text.includes(category.toLowerCase().split(' &')[0]));
  }), [gigs, query, category]);

  return <section className="container section search-page">
    <span className="eyebrow">Find your people</span><h1 className="section-title">Explore local talent.</h1>
    <div className="search-toolbar"><input className="search-input" aria-label="Search gigs" value={query} placeholder="What are you looking for?" onChange={(event) => setParams((current) => { const next = new URLSearchParams(current); event.target.value ? next.set('q', event.target.value) : next.delete('q'); return next; })} /><select aria-label="Filter by category" value={category} onChange={(event) => setParams((current) => { const next = new URLSearchParams(current); event.target.value ? next.set('category', event.target.value) : next.delete('category'); return next; })}><option value="">All categories</option><option>Design & creative</option><option>Web & technology</option><option>Writing & translation</option><option>Photo & video</option><option>Marketing</option></select></div>
    {error && <p className="muted">{error}</p>}
    {loading && <Loader label="Finding great work" />}
    {!loading && <><p className="results-count">{filtered.length} {filtered.length === 1 ? 'service' : 'services'} to explore{query ? ` for “${query}”` : ''}</p>
      {filtered.length ? <div className="gig-grid">{filtered.map((gig) => <GigCard gig={gig} key={gig.id} />)}</div> : <div className="empty-state"><h2>No exact matches yet</h2><p className="muted">Try another search or browse all available services.</p><button className="button button-outline" onClick={() => setParams({})}>Clear filters</button></div>}</>}
  </section>;
}
