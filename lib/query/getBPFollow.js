import api from '../ApiClient';

export async function getFollowersById(id) {
    const { data } = await api.get(`/api/partner/followers/${id}`);
        return data;
  }


  export async function getFollowingById(id) {
    const { data } = await api.get(`/api/partner/following/${id}`);
        return data;
  }