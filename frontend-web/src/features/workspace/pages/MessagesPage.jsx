import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';
import Loader from '../../../components/common/Loader';

export default function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    axiosClient.get('/conversations').then(({ data }) => setConversations(Array.isArray(data) ? data : data.content || []))
      .catch((requestError) => setError(requestError.response?.data?.message || 'Could not load your conversations.'))
      .finally(() => setLoading(false));
  }, []);
  return <section className="container section"><span className="eyebrow">Stay in the loop</span><h1 className="section-title">Your messages.</h1><p className="muted">Good work starts with a good conversation.</p>
    {loading ? <Loader label="Loading messages" /> : error ? <div className="notice">{error}</div> : conversations.length ? <div className="conversation-list">{conversations.map((conversation) => <Link to={`/orders/${conversation.orderId}`} className="conversation-row panel" key={conversation.id}><span className="avatar">{(conversation.name || 'C').charAt(0)}</span><div><h2>{conversation.name || conversation.participantName || 'Project member'}</h2><p className="muted">{conversation.lastMessage || 'Open your project conversation.'}</p></div><span className="text-link">Open →</span></Link>)}</div> : <div className="empty-state"><h2>It’s a little quiet here.</h2><p className="muted">Your project conversations will show up once you connect with a creator.</p><Link className="button button-accent" to="/search">Find a gig</Link></div>}
  </section>;
}
