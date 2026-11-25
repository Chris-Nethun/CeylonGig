import { Link } from 'react-router-dom';
import StarRating from '../../../components/common/StarRating';
import Badge from '../../../components/common/Badge';

export default function GigCard({ gig }) {
  return <article className="gig-card">
    <Link to={`/gigs/${gig.id}`} className="gig-art" style={{ '--art-color': gig.color || '#b0bb9d' }} aria-label={`View ${gig.title}`}>
      <span className="gig-art-mark">{gig.icon || '✳'}</span><span className="gig-art-category">{gig.category || 'Creative'}</span>
    </Link>
    <div className="gig-card-body">
      <div className="gig-seller"><span className="mini-avatar">{(gig.seller || 'C').charAt(0)}</span><span>{gig.seller || 'CeylonGig creator'}</span>{gig.verified && <Badge>Verified</Badge>}</div>
      <Link to={`/gigs/${gig.id}`} className="gig-title">{gig.title}</Link>
      <div className="gig-rating"><StarRating rating={gig.rating || 4.9} count={gig.reviews || 24} /></div>
      <div className="gig-price"><span>Starting at</span><strong>{gig.price || 'LKR 5,000'}</strong></div>
    </div>
  </article>;
}
