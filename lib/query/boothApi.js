import api from '../ApiClient';

export async function getBoothProfile(id) {
    console.log('in function');
    try {
    const { data } = await api.get(`api/boothProfile/${id}`);
    console.log('printing data');
    console.log(data);
    return data;
    }
    catch (e) {
        console.log('error in fetching data');
        console.log(e);
    }
}