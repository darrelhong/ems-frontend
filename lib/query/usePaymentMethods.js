import api from 'lib/ApiClient';
import { useQuery } from 'react-query';

export const getPaymentMethods = async () => {
  const { data } = await api.get('/api/ticketing/payment-methods');
  return data;
};

const usePaymentMethods = () => useQuery('paymeentMethods', getPaymentMethods);

export default usePaymentMethods;
