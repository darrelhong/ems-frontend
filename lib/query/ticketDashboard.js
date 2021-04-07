import api from '../ApiClient';

export async function getDailySales() {
  const { data } = await api.get(
    '/api/organiser/getTicketDailySales'
  );

  return data;
}

export async function getMonthlySales() {
    const { data } = await api.get(
      '/api/organiser/getTicketMonthlySales'
    );
  
    return data;
}

export async function getYearlySales() {
    const { data } = await api.get(
      '/api/organiser/getTicketYearlySales'
    );
  
    return data;
}

export async function getTotalSales() {
    const { data } = await api.get(
      '/api/organiser/getTicketTotalSales'
    );
  
    return data;
}


export async function getTotalTicketNumberSales() {
    const { data } = await api.get(
      '/api/organiser/getTicketTotalNumberSales'
    );
  
    return data;
}

export async function getTotalTicketNumberSalesByEvent(eventId) {
    const { data } = await api.get(
      `/api/organiser/getTicketTotalNumberSalesEvent/${eventId}`
    );
  
    return data;
}

export async function getTotalSalesByEvent(eventId) {
    const { data } = await api.get(
      `/api/organiser/getTicketTotalSalesEvent/${eventId}`
    );
  
    return data;
}

export async function getTopSales() {
    const { data } = await api.get(
      '/api/organiser/getTopTicketSalesEvents'
    );
  
    return data;
}

export async function getEvents(eoId) {
    const { data } = await api.get(
      `/api/organiser/getVaildEventForAtt/${eoId}`
    );
  
    return data;
}

export async function getEvent(eventId) {
    const { data } = await api.get(
      `/api/event/${eventId}`
    );
  
    return data;
}

export async function getDays(eventId) {
    const { data } = await api.get(
      `/api/organiser/getDaysToEndOfSales/${eventId}`
    );
  
    return data;
}

export async function getDaysStartEvent(eventId) {
    const { data } = await api.get(
      `/api/organiser/getDaysToStartOfEvent/${eventId}`
    );
  
    return data;
}

export async function getTopSalesInfo(eventId) {
    const { data } = await api.get(
      "/api/organiser/getTopSales"
    );
  
    return data;
}

export async function getTopNumberInfo(eventId) {
    const { data } = await api.get(
      "/api/organiser/getTopNumber"
    );
  
    return data;
}

export async function getCurrentSalesInfo(eventId) {
    const { data } = await api.get(
      "/api/organiser/getCurrentSales"
    );
  
    return data;
}

export async function getCurrentNumberInfo(eventId) {
    const { data } = await api.get(
      "/api/organiser/getCurrentNumber"
    );
  
    return data;
}

export async function getCurrentTicketSales(eventId) {
    const { data } = await api.get(
      "/api/organiser/getTicketSalesEventsCurrent"
    );
  
    return data;
}

export async function getUpcomingEventTicket() {
  const { data } = await api.get(
    "/api/organiser/getUpcomingEvent"
  );

  return data;
}





