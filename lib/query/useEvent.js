import api from '../ApiClient';

export default async function getEventByOrganiserId(eoId) {
  const { data } = await api.get(`/api/organiser/event/${eoId}`);
  console.log("print data")
  console.log(data);
  return data;
}
