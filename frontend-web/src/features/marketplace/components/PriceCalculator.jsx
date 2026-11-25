import { useMemo, useState } from 'react';
import { formatCurrency } from '../../../utils/formatCurrency';

export default function PriceCalculator({ basePrice = 5000 }) {
  const [extras, setExtras] = useState(0);
  const total = useMemo(() => basePrice + extras, [basePrice, extras]);
  return <div className="price-calculator">
    <label className="form-field">Package
      <select value={extras} onChange={(event) => setExtras(Number(event.target.value))}>
        <option value="0">Essential — {formatCurrency(basePrice)}</option>
        <option value="5000">Plus — {formatCurrency(basePrice + 5000)}</option>
        <option value="12000">Premium — {formatCurrency(basePrice + 12000)}</option>
      </select>
    </label>
    <div className="calculator-total"><span>Total</span><strong>{formatCurrency(total)}</strong></div>
  </div>;
}
