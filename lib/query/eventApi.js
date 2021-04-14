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

export async function retrieveLastReview(eventId, bpId) {
  const { data } = await api.get(`/api/review/${eventId}/${bpId}`);
  return data;
}

// export async function getNewApplicationsFromEvent(eventId) {
//   console.log('befgore fetching');
//   // const { data } = await api.get('/api/event/get-events');
//   const { data } = await api.get(`api/event/new-applications/1`);
//   console.log('after fetching');
//   return data;
// }

// export async function getSellerProfilesFromEvent(eventId) {
//   // const { data } = await api.get(`api/sellerProfile/event/${eventId}`);
//   // console.log('fetched data');
//   // console.log(data);
//   // return data;
//   const { data } = await api.get(`/api/event/${eventId}/all`);
//   return data;
// }

export async function getSellerProfilesFromEvent(eventId) {
  const { data } = await api.get(`/api/sellerProfile/event/${eventId}`);
  return data;
}

// export function returnNewSellerApplications(sellerApplications) {
//   return sellerApplications.filter((sellerApplication) => sellerApplication.sellerApplicationStatus == "PENDING");
// }

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

export async function uploadBoothLayout(data, eventId) {
  // data.append('file', file);
  api
    // .post('/api/uploadFile', data, {
    .post('/api/uploadBoothlayout', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onSuccess: () => {
        //   queryClient.invalidateQueries(['user', user?.id.toString()]);
        console.log('successfully uploaded');
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

export async function getAttendeeFavouriteEvents() {
  const response = await api.get(`/api/attendee/get-favourite-events`);
  return response.data;
}

export async function attendeeFavouriteEvent(eventId) {
  const response = await api.post(
    `/api/attendee/favourite-event?eventId=` + eventId
  );
  return response;
}

export async function getBusinessPartnerFavouriteEvents() {
  const response = await api.get(`/api/partner/get-favourite-events`);
  return response.data;
}

export async function getRecommendedPartners(eid) {
  const { data } = await api.get(`/api/event/recommended-bp/${eid}`);
  return data;
}

export async function checkIfRsvpSent(eid, id) {
  const { data } = await api.get(`/api/rsvp/check-sent?eid=${eid}&id=${id}`);
  return data;
}

export async function sendRsvp(eid, id) {
  const { data } = await api.post(`/api/rsvp/create?eid=${eid}&id=${id}`);
  return data;
}

export async function removeEventPic(eid, imageUrl) {
  const { data } = await api.post(
    `/api/event/remove-pic?eid=${eid}&imageUrl=${imageUrl}`
  );
  return data;
}
