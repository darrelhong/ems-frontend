import api from 'lib/ApiClient';

export async function createSellerApplication(applicationDetails, eventId, bpId) {
  const { data } = await api.post(`/api/sellerProfile/create-application?eid=${eventId}&id=${bpId}`, applicationDetails);
  return data;
}

export async function cancelSellerApplication(id) {
  const { data } = await api.post(`/api/sellerApplication/cancel/${id}`);
  return data;
}

export async function getSellerApplicationsFromBpId(id) {
  const { data } = await api.get(`/api/partner/applications/${id}`);
  return data;
}

export async function getSellerApplicationsForEO(id) {
  const { data } = await api.get(`/api/sellerApplication/organiser/${id}`);
  return data;
}

//METHOD DOESNT EXIST LMAO
// export async function getAllApplicationsForEvent(eid) {
//   const { data } = await api.get(`/api/sellerApplication/all/${eid}`);
//   return data;
// }

export function returnNewSellerApplications(sellerApplications) {
  return sellerApplications.filter((sellerApplication) => sellerApplication.sellerApplicationStatus == "PENDING");
}

export async function approveRejectApplication(id, string) {
  const { data } = await api.post(`/api/sellerApplication/${string}/${id}`);
  return data;
}

export async function getSellerProfileIdFromApplication(id) {
  try {
    const { data } = await api.get(`/api/sellerApplication/get-sellerprofile-id/${id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
}