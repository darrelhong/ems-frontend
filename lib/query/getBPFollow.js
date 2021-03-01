import api from '../ApiClient';

export async function getFollowers(id) {
    const { data } = await api.get(`/api/partner/followers/${id}`);
        return data;
  }


  export async function getFollowing(id) {
    const { data } = await api.get(`/api/partner/following/${id}`);
        return data;
  }