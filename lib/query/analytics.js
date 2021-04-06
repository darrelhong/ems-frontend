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

export async function getBoothDashboardDailyMostPopularEventList() {
  const { data } = await api.get(
    '/api/organiser/getBoothDashboardDailyMostPopularEventList'
  );

  return data;
}

export async function getBoothDashboardMonthlyMostPopularEventList() {
  const { data } = await api.get(
    '/api/organiser/getBoothDashboardMonthlyMostPopularEventList'
  );

  return data;
}
export async function getBoothDashboardMonthlyPopularEvent() {
  const { data } = await api.get('/api/organiser/getTicketDailySales');
  return data;
}

export async function getBoothDashboardYearlyMostPopularEventList() {
  const { data } = await api.get(
    '/api/organiser/getBoothDashboardYearlyMostPopularEventList'
  );

  return data;
}
