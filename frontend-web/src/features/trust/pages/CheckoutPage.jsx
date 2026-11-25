import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../components/common/Button';
import PriceCalculator from '../../marketplace/components/PriceCalculator';
import { createCheckout } from '../services/paymentApi';
import { useNotifications } from '../../../context/NotificationContext';

export default function CheckoutPage() {
  const { gigId } = useParams();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const { notify } = useNotifications();
  async function checkout() {
    setBusy(true);
    setError('');
    try {
      const result = await createCheckout(gigId);
      if (result.checkoutUrl) window.location.assign(result.checkoutUrl);
      else notify('Checkout is ready. Follow the payment instructions in your account.');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Checkout could not be started. Please try again.');
    } finally { setBusy(false); }
  }
  return <section className="container section narrow-page"><div className="breadcrumbs"><Link to={`/gigs/${gigId}`}>Gig details</Link><span> / </span><span>Checkout</span></div><span className="eyebrow">One more step</span><h1 className="section-title">Let’s make it official.</h1><div className="panel checkout-panel"><div><h2>Secure your project</h2><p className="muted">Your payment stays protected while the work gets done.</p><PriceCalculator /></div><div className="checkout-assurance"><span>✓</span><div><strong>Protected payment</strong><p className="muted">Payment is handled securely through CeylonGig.</p></div></div>{error && <div className="notice">{error}</div>}<Button variant="accent" disabled={busy} onClick={checkout}>{busy ? 'Preparing checkout…' : 'Continue to payment'}</Button><p className="secure-note">By continuing, you agree to our project and payment terms.</p></div></section>;
}
