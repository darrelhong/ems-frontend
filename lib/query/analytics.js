import api from '../ApiClient';

export async function getAllPendingBoothApplication() {
  const { data } = await api.get(
    '/api/organiser/getAllPendingBoothApplicationByEo'
  );

  return data;
}

export async function getBoothDailySales() {
  const { data } = await api.get('/api/organiser/getBoothDailySales');

  return data;
}
export async function getBoothMonthlySales() {
  const { data } = await api.get('/api/organiser/getBoothMonthlySales');

  return data;
}

export async function getBoothYearlySales() {
  const { data } = await api.get('/api/organiser/getBoothYearlySales');

  return data;
}

export async function getTicketDailySales() {
  const { data } = await api.get('/api/organiser/getTicketDailySales');

  return data;
}
