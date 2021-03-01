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

export async function updateEvent(eventDetails) {
    const { data } = await api.post('/api/event/update', eventDetails);
    //returning the event details
    return data;
}
export async function getAllEventsByOrganiser(organiserId) {
    const { data } = await api.get(`/api/event/${organiserId}/all`);
    return data;
}

export async function getAllEventsTest() {
    const { data } = await api.get('/api/event/get-events');
    return data;
}

export async function createEvent(eventDetails) {
  const { data } = await api.post('/api/event/create', eventDetails);
  //returning the event details
  return data;
}

export async function deleteEvent(eventId) {
  const response = await api.get(`/api/event/delete/${eventId}`)
}
