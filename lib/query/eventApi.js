import api from "../ApiClient";

export async function getAllEvents() {
    const { data } = await api.get("/api/event/all");
    return data;
}

export async function getEventDetails(eventId) {
    const { data } = await api.get(`/api/event/${eventId}`);
    return data;
}

