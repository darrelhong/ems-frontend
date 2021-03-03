import api from '../ApiClient';

export async function getUser(id) {
  const { data } = await api.get(`/api/user/${id}`);
  return data;
}
