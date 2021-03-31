import { useQuery } from 'react-query';
import api from '../ApiClient';

export const getEventsWithKeywordandSort = async (
  page = 0,
  sort,
  sortDir,
  searchTerm,
  isPublic = false,
  category
) => {
  let url = `/api/event/${isPublic ? 'public/' : ''}search?page=${page}`;
  if (sort && sortDir) url += `&sort=${sort}&sortDir=${sortDir}`;
  if (searchTerm) url += `&keyword=${searchTerm}`;
  if (category) url += `&category=${encodeURIComponent(category)}`;
  const { data } = await api.get(url);
  return data;
};

const getEvent = async (id, isPublic = false) => {
  const { data } = await api.get(
    `/api/event/details${isPublic ? '/public' : ''}/${id}`
  );
  return data;
};

export const useEventDetails = (id, { isPublic } = {}) =>
  useQuery(['event', id], () => getEvent(id, isPublic));
