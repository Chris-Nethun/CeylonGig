import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../components/common/Loader';
import OrderProgressBar from '../components/OrderProgressBar';
import ChatWindow from '../components/ChatWindow';
import CustomOfferCard from '../components/CustomOfferCard';
import { getOrder } from '../services/orderApi';
import MandatoryRatingModal from '../../trust/components/MandatoryRatingModal';
import DisputeModal from '../../trust/components/DisputeModal';
import Button from '../../../components/common/Button';

export default function OrderWorkspacePage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [dialog, setDialog] = useState(null);
  useEffect(() => {
    getOrder(orderId).then(setOrder).catch((requestError) => setError(requestError.response?.data?.message || 'Could not load this order.'));
  }, [orderId]);
  if (error) return <section className="container section"><div className="notice">{error}</div><Link className="text-link" to="/orders">← Back to orders</Link></section>;
  if (!order) return <section className="container section"><Loader label="Opening your project" /></section>;
  const isComplete = ['COMPLETE', 'COMPLETED'].includes(order.status?.toUpperCase());
  return <>
    <section className="container section"><div className="breadcrumbs"><Link to="/orders">Orders</Link><span> / </span><span>Project #{orderId}</span></div><span className="eyebrow">Your workspace</span><h1 className="section-title">{order.title || order.gigTitle || 'Project details'}</h1>
      <div className="workspace-grid"><div className="workspace-main"><div className="panel progress-panel"><span className="eyebrow">Project progress</span><OrderProgressBar status={order.status} /></div><ChatWindow orderId={orderId} /></div><aside className="workspace-side">{order.offer && <CustomOfferCard offer={order.offer} />}<div className="panel project-details"><span className="eyebrow">Project details</span><h2>Made with care</h2><p className="muted">{order.description || 'Your project brief and delivery details will be shared here.'}</p><div className="project-detail-line"><span>Seller</span><strong>{order.sellerName || 'Project creator'}</strong></div><div className="project-detail-line"><span>Due date</span><strong>{order.dueDate || 'To be confirmed'}</strong></div><Link className="text-link" to="/wallet">Payment details →</Link><div className="project-actions">{isComplete && !order.hasRated && <Button variant="accent" onClick={() => setDialog('rating')}>Leave a rating</Button>}<Button variant="outline" onClick={() => setDialog('dispute')}>Request support</Button></div></div></aside></div>
    </section>
    {dialog === 'rating' && <MandatoryRatingModal orderId={orderId} onClose={() => setDialog(null)} onSubmitted={() => setOrder((current) => ({ ...current, hasRated: true }))} />}
    {dialog === 'dispute' && <DisputeModal orderId={orderId} onClose={() => setDialog(null)} />}
  </>;
}
