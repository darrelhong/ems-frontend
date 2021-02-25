// import { create } from 'domain';
import api from '../ApiClient';

export async function getAllEvents() {
  const { data } = await api.get('/api/event/all');
  return data;
}

export async function getEventDetails(eventId) {
  const { data } = await api.get(`/api/event/${eventId}`);
  return data;
}

export async function createEvent(eventDetails, eventOrganiserId) {
  //to append EO ID inside this JSON
  const { data } = await api.post('/api/event/create', {
    ...eventDetails,
    eventOrganiserId,
  });
  //returning the event details
  return data;
}
