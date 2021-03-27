import api from '../ApiClient';

export async function getUser(id) {
  const { data } = await api.get(`/api/user/${id}`);
  return data;
}

export async function getUserPaymentMethod() {
  const { data } = await api.get(`/api/user/getPaymentMethod`);
  return data;
}
