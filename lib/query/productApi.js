import { AiOutlineConsoleSql } from 'react-icons/ai';
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

export async function createProduct(id, data, file) {
  let inputData = new FormData();
  inputData.append('name',data.name);
  inputData.append('description',data.description);
  inputData.append('file', file);
  // inputData.append('file', data.image[0]);
  inputData.append('id', id);
  console.log(inputData);
  api
    .post('/api/product/create', inputData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onSuccess: () => {
        console.log('successfully uploaded i think?');
      },
    })
    .then((response) => {
      console.log(response);
      if (response.status == 200) {
        console.log('file upload sucessfully');
        console.log(response);
      }
    })
    .catch((e) => {
      console.log('error caught');
      console.log(e);
    });
}

export async function updateProduct(data,file,pid) {
  let inputData = new FormData();
  inputData.append('name',data.name);
  inputData.append('description',data.description);
  inputData.append('pid', pid);
  if (file) inputData.append('file',file);
  api
  .post('/api/product/update', inputData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onSuccess: () => {
      console.log('successfully uploaded i think?');
    },
  })
  .then((response) => {
    console.log(response);
    if (response.status == 200) {
      console.log('file upload sucessfully');
      console.log(response);
    }
  })
  .catch((e) => {
    console.log('error caught');
    console.log(e);
  });
}

export async function deleteProduct(id) {
  const { data } = await api.post(`/api/product/delete/${id}`);
  return data;
}