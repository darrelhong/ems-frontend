//import { useQuery } from 'react-query';
import api from '../ApiClient';

//const getEventsById = async (id) => {
//  const { data } = await api.get(`/api/partner/events/${id}`);
//  return data;
//};

export default async function getAllEventByBpId(id) {
  const { data } = await api.get(`/api/partner/getAllEventByBpId/${id}`);
  return data;
}
