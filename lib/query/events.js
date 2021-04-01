import { useQuery } from 'react-query';
import api from '../ApiClient';

export const getEventsWithKeywordandSort = async (
  page = 0,
  sort,
  sortDir,
  searchTerm,
  filterValue
) => {
  let url = `/api/event/get-events?page=${page}`;
  if (sort && sortDir) url += `&sort=${sort}&sortDir=${sortDir}`;
  if (searchTerm) url += `&keyword=${searchTerm}`;
  url += `&filter=${filterValue}`
  const { data } = await api.get(url);
  return data;
};

const getEvent = async (id, isPublic = false) => {
  const { data } = await api.get(
    `/api/event${isPublic ? '/public' : ''}/${id}`
  );
  return data;
};

export const likeEvent = async (bpId, eventId) => {
  const response = await api.post(`/api/partner/like/${bpId}/${eventId}`);
  return response;
}

export const unlikeEvent = async (bpId, eventId) => {
  const response = await api.post(`/api/partner/unlike/${bpId}/${eventId}`)
  return response;
}

export const useEvent = (id, { isPublic } = {}) =>
  useQuery(['event', id], () => getEvent(id, isPublic));
