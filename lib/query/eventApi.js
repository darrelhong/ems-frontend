// import { create } from 'domain';
import api from '../ApiClient';

export async function getAllEvents() {
  const { data } = await api.get('/api/event/all');
  return data;
}

export async function getEventDetails(eventId) {
  const { data } = await api.get(`/api/event/${eventId}`);
  return data;
}

export async function updateEvent(eventDetails) {
  const { data } = await api.post('/api/event/update', eventDetails);
  //returning the event details
  return data;
}
export async function getAllEventsByOrganiser(organiserId) {
  const { data } = await api.get(`/api/event/${organiserId}/all`);
  return data;
}

export async function getAllEventsTest() {
  const { data } = await api.get('/api/event/get-events');
  return data;
}

export async function createEvent(eventDetails) {
  const { data } = await api.post('/api/event/create', eventDetails);
  //returning the event details
  return data;
}

export async function deleteEvent(eventId) {
  const response = await api.get(`/api/event/delete/${eventId}`);
  return response;
}

export async function uploadEventImage(data, eventId) {
  // data.append('file', file);
  api
    // .post('/api/uploadFile', data, {
    .post('/api/uploadEventImage', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onSuccess: () => {
        //   queryClient.invalidateQueries(['user', user?.id.toString()]);
        console.log('successfully uploaded i think?');
      },
    })
    .then((response) => {
      console.log(response);
      if (response.status == 200) {
        console.log('file upload sucessfully');
        console.log(response);
        console.log(response.data['fileDownloadUri']);
        var newlink = response.data['fileDownloadUri'];
        //   setProfilepicUrl(newlink);
      }
    })
    .catch((e) => {
      // setShowFailedMsg(true);
      console.log('error caught');
      console.log(e);
    });
}

export async function uploadMultipleEventImage(data) {
  try {
    const response = await api.post('/api/uploadMultipleFiles', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status == 200) console.log('file uploaded successfully');
  } catch (e) {
    console.log('error caught');
    console.log(e);
  }
}
