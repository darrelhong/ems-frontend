import { useQuery } from 'react-query';
import api from '../ApiClient';

const getEventsById = async (id) => {
  const { data } = await api.get(`/api/partner/events/${id}`);
  return data;
};

export default function getEvents(id) {
  return useQuery(['events', id], () => getEventsById(id), {
    staleTime: 900000, // 15 mins
    cacheTime: 3600000, // 1 hr
  });
}
