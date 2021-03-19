import api from '../ApiClient';

export async function getFollowingBp(id) {
  const { data } = await api.get(`/api/attendee/listFollowingBP/${id}`);
  return data;
}

export async function getFollowingEo(id) {
  const { data } = await api.get(`/api/attendee/listFollowingEo/${id}`);
  return data;
}