import { useQuery } from 'react-query';
import api from '../ApiClient';

const getOrgAttendeeFollowersById = async (id) => {
  const { data } = await api.get(`/api/organiser/attendeeFollowers/${id}`);
  console.log("data " + data);
  return data;
};

export default function getOrgAttendeeFollowers(id) {
  return useQuery(['attendeeFollowers', id], () => getOrgAttendeeFollowersById(id), {
    staleTime: 900000, // 15 mins
    cacheTime: 3600000, // 1 hr
  });
}