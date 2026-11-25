import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';
import Badge from '../../../components/common/Badge';
import StarRating from '../../../components/common/StarRating';
import PriceCalculator from '../components/PriceCalculator';

export default function GigDetailPage() {
  const { gigId } = useParams();
  const [gig, setGig] = useState(null);
  useEffect(() => { axiosClient.get(`/gigs/${encodeURIComponent(gigId)}`).then(({ data }) => setGig(data)).catch(() => setGig(null)); }, [gigId]);
  const title = gig?.title || 'A thoughtful service, made just for your next idea';
  return <section className="container section">
    <div className="breadcrumbs"><Link to="/">Home</Link><span> / </span><Link to="/search">Explore gigs</Link><span> / </span><span>{gig?.category || 'Creative services'}</span></div>
    <div className="gig-detail-grid"><div className="gig-detail-main">
      <span className="eyebrow">{gig?.category || 'Made on the island'}</span><h1 className="detail-title">{title}</h1>
      <div className="detail-seller"><span className="mini-avatar">{(gig?.sellerName || 'C').charAt(0)}</span><strong>{gig?.sellerName || 'CeylonGig creator'}</strong><Badge>Local talent</Badge><StarRating rating={gig?.rating || 4.9} count={gig?.reviewCount || 18} /></div>
      <div className="detail-art"><span>✳</span><p>Thoughtful work.<br />Made with care.</p></div>
      <h2>About this service</h2><p className="muted">{gig?.description || 'Every project starts with a conversation. Share what you have in mind and work together with a talented independent creator to make it real.'}</p>
      <div className="detail-info"><div><span className="eyebrow">You’ll get</span><p>Carefully crafted work that fits your brief</p></div><div><span className="eyebrow">Delivery</span><p>{gig?.deliveryDays || 5} days</p></div><div><span className="eyebrow">Revisions</span><p>{gig?.revisions || 2} rounds included</p></div></div>
    </div><aside className="panel purchase-card"><span className="eyebrow">Choose your package</span><h2>{gig?.packageName || 'Essential'}</h2><p className="muted">A great place to start your project.</p><PriceCalculator basePrice={gig?.price || 5000} /><ul className="included-list"><li>✓ Direct communication</li><li>✓ Secure payment protection</li><li>✓ Work delivered to your brief</li></ul><Link className="button button-accent full-button" to={`/checkout/${gigId}`}>Continue to checkout</Link><p className="secure-note">Your payment is protected by CeylonGig.</p></aside></div>
  </section>;
}
