import api from 'lib/ApiClient';

export async function getAllBoothProfiles() {
    console.log('getting all booths');
    try {
        const { data } = await api.get(`api/boothProfile/all`);
        console.log('printing data');
        console.log(data);
        return data;
    }
    catch (e) {
        console.log('error in fetching data');
        console.log(e);
    }
};

export async function getBoothProfile(id) {
    const { data } = await api.get(`/api/boothProfile/${id}`);
    return data;
}

export async function getBoothsByBoothProfile(id) {
    const { data } = await api.get(`/api/booth/boothProfile/${id}`);
    return data;
}