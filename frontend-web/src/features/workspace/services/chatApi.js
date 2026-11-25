import axiosClient from '../../../api/axiosClient';

export async function getMessages(orderId) {
  const { data } = await axiosClient.get(`/orders/${encodeURIComponent(orderId)}/messages`);
  return Array.isArray(data) ? data : data.content || [];
}

export async function sendMessage(orderId, message) {
  const { data } = await axiosClient.post(`/orders/${encodeURIComponent(orderId)}/messages`, { message });
  return data;
}
