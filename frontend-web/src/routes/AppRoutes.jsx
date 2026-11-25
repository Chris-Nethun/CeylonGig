import { Link, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../features/marketplace/pages/HomePage';
import SearchPage from '../features/marketplace/pages/SearchPage';
import GigDetailPage from '../features/marketplace/pages/GigDetailPage';
import CreateGigPage from '../features/marketplace/pages/CreateGigPage';
import LoginPage from '../features/identity/pages/LoginPage';
import RegisterPage from '../features/identity/pages/RegisterPage';
import ProfilePage from '../features/identity/pages/ProfilePage';
import AdminUsersPage from '../features/identity/pages/AdminUsersPage';
import OrdersListPage from '../features/workspace/pages/OrdersListPage';
import OrderWorkspacePage from '../features/workspace/pages/OrderWorkspacePage';
import MessagesPage from '../features/workspace/pages/MessagesPage';
import CheckoutPage from '../features/trust/pages/CheckoutPage';
import WalletPage from '../features/trust/pages/WalletPage';
import AdminDisputesPage from '../features/trust/pages/AdminDisputesPage';

function Protected({ children }) { return <ProtectedRoute>{children}</ProtectedRoute>; }

export function AppRoutes() {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/gigs/:gigId" element={<GigDetailPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
    <Route path="/gigs/create" element={<Protected><CreateGigPage /></Protected>} />
    <Route path="/orders" element={<Protected><OrdersListPage /></Protected>} />
    <Route path="/orders/:orderId" element={<Protected><OrderWorkspacePage /></Protected>} />
    <Route path="/messages" element={<Protected><MessagesPage /></Protected>} />
    <Route path="/checkout/:gigId" element={<Protected><CheckoutPage /></Protected>} />
    <Route path="/wallet" element={<Protected><WalletPage /></Protected>} />
    <Route path="/admin/users" element={<Protected><AdminUsersPage /></Protected>} />
    <Route path="/admin/disputes" element={<Protected><AdminDisputesPage /></Protected>} />
    <Route path="*" element={<main className="container section"><div className="empty-state"><h1>Page not found</h1><p className="muted">That page may have moved. Head back to the marketplace.</p><Link className="button" to="/">Back home</Link></div></main>} />
  </Routes>;
}
