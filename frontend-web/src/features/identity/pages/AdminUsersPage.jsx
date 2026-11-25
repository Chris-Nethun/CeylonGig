import { useEffect, useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import Loader from '../../../components/common/Loader';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    axiosClient.get('/admin/users').then(({ data }) => setUsers(Array.isArray(data) ? data : data.content || []))
      .catch((requestError) => setError(requestError.response?.data?.message || 'Could not load user accounts.'))
      .finally(() => setLoading(false));
  }, []);
  return <section className="container section"><span className="eyebrow">Administration</span><h1 className="section-title">User accounts</h1>
    {loading ? <Loader label="Loading users" /> : error ? <div className="notice">{error}</div> : <div className="panel table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead><tbody>{users.map((user) => <tr key={user.id || user.email}><td>{user.name || '—'}</td><td>{user.email}</td><td>{user.role || 'Member'}</td><td>{user.status || 'Active'}</td></tr>)}</tbody></table>{!users.length && <p className="muted">No user accounts to display.</p>}</div>}
  </section>;
}
