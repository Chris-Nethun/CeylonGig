import axiosClient from '../../../api/axiosClient';

export async function login(credentials) {
  const { data } = await axiosClient.post('/auth/login', credentials);
  return data;
}

export async function register(details) {
  const { data } = await axiosClient.post('/auth/register', details);
  return data;
}

export async function getProfile() {
  const { data } = await axiosClient.get('/users/me');
  return data;
}
