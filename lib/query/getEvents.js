//import { useQuery } from 'react-query';
import api from '../ApiClient';

//const getEventsById = async (id) => {
//  const { data } = await api.get(`/api/partner/events/${id}`);
//  return data;
//};

export async function getAllEventByBpId(id) {
  const { data } = await api.get(`/api/partner/getAllEventByBpId/${id}`);
  return data;
}

export async function getEventsByAtnFollowers(id, pageParam = 0) {
  if (pageParam == 0) {
    const { data } = await api.get(`/api/attendee/getEventsByAtnFollowers/${id}`);
    return data;
  }
  else {
    const { data } = await api.get(`/api/attendee/getEventsByAtnFollowers/${id}/${pageParam}`);
    return data;
  }
}

export async function getEventsByAtnCategoryPreferences(id, pageParam = 0) {
  if (pageParam == 0) {
    const { data } = await api.get(`/api/attendee/getEventsByAtnCategoryPreferences/${id}`);
    return data;
  }
  else {
    const { data } = await api.get(`/api/attendee/getEventsByAtnCategoryPreferences/${id}/${pageParam}`);
    return data;
  }
}

export async function getEventsByBpFollowers(id, pageParam = 0) {
  if (pageParam == 0) {
    const { data } = await api.get(`/api/partner/getEventsByBpFollowers/${id}`);
    return data;
  }
  else {
    const { data } = await api.get(`/api/partner/getEventsByBpFollowers/${id}/${pageParam}`);
    return data;
  }
}

export async function getEventsByBpBusinessCategory(id, pageParam = 0) {
  if (pageParam == 0) {
    const { data } = await api.get(`/api/partner/getEventsByBpBusinessCategory/${id}`);
    return data;
  }
  else {
    const { data } = await api.get(`/api/partner/getEventsByBpBusinessCategory/${id}/${pageParam}`);
    return data;
  }
}

export async function getEventsThisWeekend(pageParam = 0) {
  if (pageParam == 0) {
    const { data } = await api.get(`/api/event/getEventsThisWeekend`);
    return data;
  }
  else {
    const { data } = await api.get(`/api/event/getEventsThisWeekend/${pageParam}`);
    return data;
  }
}

export async function getEventsNextWeek(pageParam = 0) {
  if (pageParam == 0) {
    const { data } = await api.get(`/api/event/getEventsNextWeek`);
    return data;
  }
  else {
    const { data } = await api.get(`/api/event/getEventsNextWeek/${pageParam}`);
    return data;
  }
}

export async function getEventsInNext30Days(pageParam = 0) {
  if (pageParam == 0) {
    const { data } = await api.get(`/api/event/getEventsInNext30Days`);
    return data;
  }
  else {
    const { data } = await api.get(`/api/event/getEventsInNext30Days/${pageParam}`);
    return data;
  }
}

export async function getTopTenEvents() {
  const { data } = await api.get(`/api/event/getTopTenEvents`);
  return data;
}

export async function getVipEvents(pageParam = 0) {
  if (pageParam == 0) {
    const { data } = await api.get(`/api/event/getVipEvents`);
    return data;
  }
  else {
    const { data } = await api.get(`/api/event/getVipEvents/${pageParam}`);
    return data;
  }
}