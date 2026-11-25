import axiosClient from '../../../api/axiosClient';

export async function getGigs(params = {}) {
  const { data } = await axiosClient.get('/gigs', { params });
  return Array.isArray(data) ? data : data.content || [];
}

export async function getGig(gigId) {
  const { data } = await axiosClient.get(`/gigs/${encodeURIComponent(gigId)}`);
  return data;
}

export async function createGig(details) {
  const { data } = await axiosClient.post('/gigs', details);
  return data;
}
