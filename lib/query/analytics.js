import api from '../ApiClient';

export async function getAllPendingBoothApplication() {
  const { data } = await api.get(
    '/api/organiser/getAllPendingBoothApplicationByEo'
  );

  return data;
}
