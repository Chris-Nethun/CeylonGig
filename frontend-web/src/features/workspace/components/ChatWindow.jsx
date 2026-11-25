import { useEffect, useRef, useState } from 'react';
import { getMessages, sendMessage } from '../services/chatApi';
import { useAuth } from '../../../context/AuthContext';
import { useNotifications } from '../../../context/NotificationContext';

export default function ChatWindow({ orderId }) {
  const { user } = useAuth();
  const { notify } = useNotifications();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const listRef = useRef(null);
  useEffect(() => {
    let active = true;
    getMessages(orderId).then((items) => { if (active) setMessages(items); })
      .catch((requestError) => { if (active) setError(requestError.response?.data?.message || 'Messages are not available right now.'); });
    return () => { active = false; };
  }, [orderId]);
  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [messages]);
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const message = new FormData(form).get('message')?.toString().trim();
    if (!message) return;
    try {
      const saved = await sendMessage(orderId, message);
      setMessages((items) => [...items, saved]);
      form.reset();
      setError('');
    } catch (requestError) {
      const messageText = requestError.response?.data?.message || 'Your message could not be sent.';
      setError(messageText);
      notify(messageText, 'error');
    }
  }
  return <section className="chat-panel panel"><div className="chat-heading"><div><span className="eyebrow">Project conversation</span><h2>Messages</h2></div><span className="online-indicator">Order #{orderId}</span></div>
    <div className="chat-messages" ref={listRef}>{error && <p className="chat-error">{error}</p>}{messages.length ? messages.map((message, index) => <div className={`chat-message ${message.senderId === user?.id || message.sender === user?.name ? 'mine' : ''}`} key={message.id || index}><span className="message-author">{message.senderName || message.sender || 'Project member'}</span><p>{message.message || message.content}</p></div>) : !error && <div className="empty-chat"><span>✳</span><p>Your project conversation will appear here.</p></div>}</div>
    <form className="chat-compose" onSubmit={submit}><input name="message" aria-label="Write a message" maxLength="2000" placeholder="Write a message…" required /><button className="button button-accent" type="submit">Send</button></form>
  </section>;
}
