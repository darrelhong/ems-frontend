import { useQuery } from 'react-query';
import api from '../ApiClient';

export const getEventsWithKeywordandSort = async (
  page = 0,
  sort,
  sortDir,
  searchTerm,
  isPublic = false
) => {
  let url = `/api/event/${isPublic ? 'public/' : ''}get-events?page=${page}`;
  if (sort && sortDir) url += `&sort=${sort}&sortDir=${sortDir}`;
  if (searchTerm) url += `&keyword=${searchTerm}`;
  const { data } = await api.get(url);
  return data;
};

const getEvent = async (id, isPublic = false) => {
  const { data } = await api.get(
    `/api/event${isPublic ? '/public' : ''}/${id}`
  );
  return data;
};

export const useEvent = (id, { isPublic } = {}) =>
  useQuery(['event', id], () => getEvent(id, isPublic));
