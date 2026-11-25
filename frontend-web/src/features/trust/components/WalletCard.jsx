import { formatCurrency } from '../../../utils/formatCurrency';

export default function WalletCard({ balance = 0, currency = 'LKR' }) {
  return <article className="wallet-card"><span className="wallet-orb">✳</span><span className="wallet-label">Available balance</span><strong>{formatCurrency(balance, currency)}</strong><span className="wallet-footnote">Your money, made easy to track.</span></article>;
}
