import { useQuery } from 'react-query';

const { default: api } = require('lib/ApiClient');

const getAttendeeFavouriteEvents = async () => {
  const { data } = await api.get(`/api/attendee/get-favourite-events`);
  return data;
};

export default function useAttendeeFavouriteEvents() {
  return useQuery('attendeeFavEvents', getAttendeeFavouriteEvents);
}
