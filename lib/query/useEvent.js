import api from '../ApiClient';

export async function getEventByOrganiserId(eoId) {
  const { data } = await api.get(`/api/organiser/event/${eoId}`);
  return data;
}

export async function getUpcomingEventsByOrganiserId(eoId) {
  const { data } = await api.get(`/api/organiser/event/${eoId}`);
  let upcominglist = [];
  data.forEach((item) => {
    if (item.eventStatus === 'UPCOMING') {
      upcominglist.push(item);
    }
  });
  return upcominglist;
}

export async function getCurrentEventsByOrganiserId(eoId) {
  const { data } = await api.get(`/api/organiser/event/${eoId}`);
  let currentlist = [];
  data.forEach((item) => {
    if (item.eventStatus === 'PUBLISHED') {
      currentlist.push(item);
    }
  });
  return currentlist;
}

export async function getPastEventsByOrganiserId(eoId) {
  const { data } = await api.get(`/api/organiser/event/${eoId}`);
  let completedlist = [];
  data.forEach((item) => {
    if (item.eventStatus === 'COMPLETED') {
      completedlist.push(item);
    }
  });
  return completedlist;
}
