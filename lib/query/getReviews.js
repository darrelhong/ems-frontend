import api from '../ApiClient';
//eo id
export async function getReviews(id) {
  const { data } = await api.get(`/api/review/eo/${id}`);
  return data;
}


export async function getReviewsByEvent(id) {
  const { data } = await api.get(`/api/review/${id}`);
  return data;
}
