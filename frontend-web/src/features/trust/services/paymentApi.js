import axiosClient from '../../../api/axiosClient';

export async function getWallet() {
  const { data } = await axiosClient.get('/wallet');
  return data;
}

export async function createCheckout(gigId, packageName = 'ESSENTIAL') {
  const { data } = await axiosClient.post('/payments/checkout', { gigId, packageName });
  return data;
}
