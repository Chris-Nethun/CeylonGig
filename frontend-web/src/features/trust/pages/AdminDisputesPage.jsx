import { useEffect, useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import Loader from '../../../components/common/Loader';
import Badge from '../../../components/common/Badge';

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    axiosClient.get('/admin/disputes').then(({ data }) => setDisputes(Array.isArray(data) ? data : data.content || []))
      .catch((requestError) => setError(requestError.response?.data?.message || 'Could not load open disputes.'))
      .finally(() => setLoading(false));
  }, []);
  return <section className="container section"><span className="eyebrow">Administration</span><h1 className="section-title">Dispute resolution</h1><p className="muted">Review open requests and help both sides move forward.</p>
    {loading ? <Loader label="Loading disputes" /> : error ? <div className="notice">{error}</div> : disputes.length ? <div className="dispute-list">{disputes.map((dispute) => <article className="panel dispute-row" key={dispute.id}><div><h2>Order #{dispute.orderId || dispute.id}</h2><p className="muted">{dispute.reason}</p></div><Badge tone="spice">{dispute.status || 'Open'}</Badge></article>)}</div> : <div className="empty-state"><h2>All clear for now.</h2><p className="muted">There are no open disputes needing review.</p></div>}
  </section>;
}
