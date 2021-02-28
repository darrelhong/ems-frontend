import { useQuery } from 'react-query';
import api from '../ApiClient';

const getOrgPartnerFollowersById = async (id) => {
  const { data } = await api.get(`/api/organiser/partnerFollowers/${id}`);
  console.log("data " + data);
  return data;
};

export default function getOrgPartnerFollowers(id) {
  return useQuery(['partnerFollowers', id], () => getOrgPartnerFollowersById(id), {
    staleTime: 900000, // 15 mins
    cacheTime: 3600000, // 1 hr
  });
}