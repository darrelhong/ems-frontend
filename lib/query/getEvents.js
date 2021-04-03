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

export async function getAllEventsByAtnCategoryPreferences(id) {
  const { data } = await api.get(`/api/attendee/getAllEventsByAtnCategoryPreferences/${id}`);
  return data;
}

export async function getAllEventsByBpFollowers(id) {
  const { data } = await api.get(`/api/partner/getAllEventsByBpFollowers/${id}`);
  return data;
}

export async function getAllEventsByBpBusinessCategory(id) {
  const { data } = await api.get(`/api/partner/getAllEventsByBpBusinessCategory/${id}`);
  return data;
}

export async function getAllEventsThisWeekend() {
  const { data } = await api.get(`/api/event/getAllEventsThisWeekend`);
  return data;
}

export async function getAllEventsNextWeek() {
  const { data } = await api.get(`/api/event/getAllEventsNextWeek`);
  return data;
}

export async function getAllEventsInNext30Days() {
  const { data } = await api.get(`/api/event/getAllEventsInNext30Days`);
  return data;
}

export async function getMostPopularEvent() {
  const { data } = await api.get(`/api/event/getMostPopularEvent`);
  return data;
}

export async function getTopTenEvents() {
  const { data } = await api.get(`/api/event/getTopTenEvents`);
  return data;
}