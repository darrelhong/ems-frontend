import { useQuery } from 'react-query';
import api from '../ApiClient';

const getUserById = async (id: number) => {
  const { data } = await api.get(`/api/user/${id}`);
  return data;
};

export default function useUser(id: number) {
  return useQuery('user', () => getUserById(id), {
    staleTime: 900000, // 15 mins
    cacheTime: 3600000, // 1 hr
  });
}
