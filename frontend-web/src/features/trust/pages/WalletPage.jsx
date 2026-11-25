import { useEffect, useState } from 'react';
import Loader from '../../../components/common/Loader';
import WalletCard from '../components/WalletCard';
import { getWallet } from '../services/paymentApi';
import { formatCurrency } from '../../../utils/formatCurrency';

export default function WalletPage() {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { getWallet().then(setWallet).catch((requestError) => setError(requestError.response?.data?.message || 'Could not load your wallet.')); }, []);
  return <section className="container section"><span className="eyebrow">Money, made clear</span><h1 className="section-title">Your wallet.</h1><p className="muted">A simple view of your balance and recent activity.</p>
    {error ? <div className="notice">{error}</div> : !wallet ? <Loader label="Loading your wallet" /> : <div className="wallet-layout"><WalletCard balance={wallet.balance} currency={wallet.currency || 'LKR'} /><div className="panel transactions"><span className="eyebrow">Recent activity</span><h2>Transactions</h2>{wallet.transactions?.length ? wallet.transactions.map((transaction) => <div className="transaction-row" key={transaction.id}><div><strong>{transaction.description || transaction.type || 'Wallet activity'}</strong><span>{transaction.date ? new Date(transaction.date).toLocaleDateString() : 'Recent'}</span></div><strong>{formatCurrency(transaction.amount, wallet.currency || 'LKR')}</strong></div>) : <div className="empty-state"><p className="muted">Your wallet activity will appear here.</p></div>}</div></div>}
  </section>;
}
