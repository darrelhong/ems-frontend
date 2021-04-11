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
  console.log("url: " + url)
  return data;
};

export const getEventsWithKeywordandSortFilter = async (
  page = 0,
  filterValue,
  sort,
  sortDir,
  searchTerm,
  userId
) => {
  // console.log("userId: ", userId)
  let url = `/api/event/get_events?page=${page}`;
  url += "&size=10"
  url += `&filter=${filterValue}`
  if (sort && sortDir) url += `&sort=${sort}&sortDir=${sortDir}`;
  if (searchTerm) url += `&keyword=${searchTerm}`;
  if (userId) url += `&user=${userId}`;
  // console.log("url: " + url)
  const { data } = await api.get(url);
  return data;
}

const getEvent = async (id, isPublic = false) => {
  const { data } = await api.get(
    `/api/event${isPublic ? '/public' : ''}/details/${id}`
  );
  return data;
};

export const partnerLikeEvent = async (bpId, eventId) => {
  const response = await api.post(`/api/partner/like/${bpId}/${eventId}`);
  return response;
}

export const partnerUnlikeEvent = async (bpId, eventId) => {
  const response = await api.post(`/api/partner/unlike/${bpId}/${eventId}`)
  return response;
}

export const useEventDetails = (id, { isPublic } = {}) =>
  useQuery(['event', id], () => getEvent(id, isPublic));
