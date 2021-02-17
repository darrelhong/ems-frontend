import Axios from 'axios';

const api = Axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const api2 = Axios.create({
  
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  
});

export default api;
