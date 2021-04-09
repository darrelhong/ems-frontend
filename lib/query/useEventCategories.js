import api from 'lib/ApiClient';
import { useQuery } from 'react-query';


const getDistinctEventCategories = async () => {
  const { data } = await api.get(`/api/event/categories`);
  return data;
};

export default function useEventCategories() {
  return useQuery('eventCategories', getDistinctEventCategories);
}
