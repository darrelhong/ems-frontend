import api from '../ApiClient';

export async function getAllVipsByOrganiser() {
  const { data } = await api.get(`/api/organiser/vip/all`);
  return data;
}

export async function deleteSelectedVip(bpid) {
  const { data } = await api.post(`/api/organiser/vip/remove/${bpid}`);
  return data;
}

export async function addVip(bpid) {
  console.log("call add vip");
  const { data } = await api.post(`/api/organiser/vip/add/${bpid}`);
  console.log(data);
  return data;
}

export async function isBpVip(bpid) {
  const { data } = await api.post(`/api/organiser/vip/isvip/${bpid}`);
  return data;
}
