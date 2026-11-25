import axiosClient from '../../../api/axiosClient';

export async function submitRating(orderId, rating, review) {
  const { data } = await axiosClient.post(`/orders/${encodeURIComponent(orderId)}/rating`, { rating, review });
  return data;
}
