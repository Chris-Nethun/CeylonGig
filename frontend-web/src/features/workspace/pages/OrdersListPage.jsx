import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../components/common/Loader';
import Badge from '../../../components/common/Badge';
import { getOrders } from '../services/orderApi';

export default function OrdersListPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    getOrders().then(setOrders).catch((requestError) => setError(requestError.response?.data?.message || 'Could not load your orders.')).finally(() => setLoading(false));
  }, []);
  return <section className="container section"><span className="eyebrow">Your workspace</span><h1 className="section-title">Orders & projects</h1><p className="muted">Keep every project, conversation and delivery in one place.</p>
    {loading ? <Loader label="Loading your orders" /> : error ? <div className="notice">{error}</div> : orders.length ? <div className="order-list">{orders.map((order) => <Link className="order-row panel" to={`/orders/${order.id}`} key={order.id}><div className="order-icon">✳</div><div className="order-summary"><h2>{order.title || order.gigTitle || `Project #${order.id}`}</h2><p className="muted">With {order.sellerName || order.buyerName || 'CeylonGig member'}</p></div><Badge>{order.status || 'Placed'}</Badge><span className="order-arrow">→</span></Link>)}</div> : <div className="empty-state"><div className="empty-icon">✳</div><h2>Your next project starts here.</h2><p className="muted">Browse services from local independent talent.</p><Link className="button button-accent" to="/search">Explore gigs</Link></div>}
  </section>;
}
