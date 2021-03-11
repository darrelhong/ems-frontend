import { useQuery } from 'react-query';
import api from '../ApiClient';

export const getEventsWithKeywordandSort = async (
  page = 0,
  sort,
  sortDir,
  searchTerm
) => {
  let url = `/api/event/get-events?page=${page}`;
  if (sort && sortDir) url += `&sort=${sort}&sortDir=${sortDir}`;
  if (searchTerm) url += `&keyword=${searchTerm}`;
  const { data } = await api.get(url);
  return data;
};

const getEvent = async (id) => {
  const { data } = await api.get(`/api/event/${id}`);
  return data;
};

export const useEvent = (id) => useQuery(['event', id], () => getEvent(id));
