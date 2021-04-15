import api from 'lib/ApiClient';
import { useQuery } from 'react-query';

export const getPaymentMethods = async () => {
  const { data } = await api.get('/api/sellerApplication/payment-methods');
  return data;
};

const usePaymentMethods = () => useQuery('paymentMethods', getPaymentMethods);

export default usePaymentMethods;
