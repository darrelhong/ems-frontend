import { useQuery } from 'react-query';
import api from '../ApiClient';

const getFollowingById = async (id) => {
  const { data } = await api.get(`/api/partner/following/${id}`);
  console.log("data " + data);
  return data;
};

export default function getFollowing(id) {
  return useQuery(['following', id], () => getFollowingById(id), {
    staleTime: 900000, // 15 mins
    cacheTime: 3600000, // 1 hr
  });
}