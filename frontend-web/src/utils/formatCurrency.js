export function formatCurrency(amount, currency = 'LKR') {
  const value = Number(amount);
  if (!Number.isFinite(value)) return `${currency} 0`;
  return new Intl.NumberFormat('en-LK', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
}
