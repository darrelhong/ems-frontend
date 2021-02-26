import { useQuery } from 'react-query';
import api from '../ApiClient';

const getFollowersById = async (id) => {
  const { data } = await api.get(`/api/partner/followers/${id}`);
  console.log("data " + data);
  return data;
};

export default function getFollowers(id) {
  return useQuery(['followers', id], () => getFollowersById(id), {
    staleTime: 900000, // 15 mins
    cacheTime: 3600000, // 1 hr
  });
}