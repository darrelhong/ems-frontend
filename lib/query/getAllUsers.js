import api from '../ApiClient';

export async function getEventOrganisers() {
    const { data } = await api.get('/api/organiser/all');
    return data;
  }

  export async function getBusinessPartners() {
    const { data } = await api.get('/api/partner/all');
    return data;
  }

  export async function getAttendees() {
    const { data } = await api.get('/api/attendee/all');
    return data;
  }