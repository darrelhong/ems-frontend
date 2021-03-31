import api from '../ApiClient';

export async function getBpEventsByIdRoleStatus(bpId, role, status) {
    const { data } = await api.get(
      `/api/partner/events/${bpId}/${role}/${status}`
    );
    return data;
  }