import api from 'lib/ApiClient';

export async function getAllSellerProfiles() {
    console.log('getting all booths');
    try {
        const { data } = await api.get(`api/sellerProfile/all`);
        console.log('printing data');
        console.log(data);
        return data;
    }
    catch (e) {
        console.log('error in fetching data');
        console.log(e);
    }
};

export async function getSellerProfile(id) {
    const { data } = await api.get(`/api/sellerProfile/${id}`);
    return data;
}

export async function getBoothsBySellerProfile(id) {
    const { data } = await api.get(`/api/booth/sellerProfile/${id}`);
    return data;
}