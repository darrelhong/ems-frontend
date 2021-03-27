import api from '../ApiClient';

export async function removeBoothProduct(pid, id) {
  console.log('before reoving');
  const { data } = await api.post(`/api/booth/remove-product?pid=${pid}&id=${id}`);
  console.log('after reoving');
  return data;
}

export async function addProduct(pid, id) {
  const { data } = await api.post(`/api/booth/add-product?pid=${pid}&id=${id}`);
  return data;
}

export async function getProductsByBpId(id) {
  const { data } = await api.get(`/api/partner/products/${id}`);
  return data;
}

export async function getProductsByBoothId(id) {
  const { data } = await api.get(`/api/booth/products/${id}`);
  return data;
}