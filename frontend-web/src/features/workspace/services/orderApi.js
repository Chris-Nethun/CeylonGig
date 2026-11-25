import axiosClient from '../../../api/axiosClient';

export async function getOrders() {
  const { data } = await axiosClient.get('/orders');
  return Array.isArray(data) ? data : data.content || [];
}

export async function getOrder(orderId) {
  const { data } = await axiosClient.get(`/orders/${encodeURIComponent(orderId)}`);
  return data;
}

export async function updateOrderStatus(orderId, status) {
  const { data } = await axiosClient.patch(`/orders/${encodeURIComponent(orderId)}/status`, { status });
  return data;
}
