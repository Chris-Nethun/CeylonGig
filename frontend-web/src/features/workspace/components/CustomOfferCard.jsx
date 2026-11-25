import { formatCurrency } from '../../../utils/formatCurrency';

export default function CustomOfferCard({ offer }) {
  return <article className="offer-card"><span className="eyebrow">Custom offer</span><h3>{offer?.title || 'Project offer'}</h3><p className="muted">{offer?.description || 'A tailored offer for your project.'}</p><div className="offer-meta"><span>{offer?.deliveryDays || 5} days</span><strong>{formatCurrency(offer?.price || 0)}</strong></div></article>;
}
