import api from '../ApiClient';

// event status:  DRAFT, UPCOMING, COMPLETED, CANCELLED
export async function getEventByOrganiserId(eoId) {
  const { data } = await api.get(`/api/organiser/event/${eoId}`);
  return data;
}

export async function getRating(eoId){
  const { data } = await api.get(`/api/organiser/event/${eoId}`);
  var rating = 0;
  data.forEach((item) => {
    rating = rating + item.rating;
  })
  
  return rating/data.length;

}

// export async function getPartnerUpcomingEventsByOrganiserId(eoId) {
//   const { data } = await api.get(`/api/organiser/event/${eoId}`);
//   console.log(data);
//   let upcominglist = [];
//   data.forEach((item) => {
//     // add item.applyBooth status = false
//     // booth application havent start
//     var now = new Date();
//     console.log('now');
//     console.log(now);
//     var eventStartDate_ = new Date(item.eventStartDate);
//     console.log('event start date');
//     console.log(eventStartDate_);
//     var salesStartDate_ = new Date(item.saleStartDate);
//     console.log('sales start date');
//     console.log(salesStartDate_);

//     if (
//       item.eventStatus === 'UPCOMING' &&
//       item.hidden === false &&
//       item.published === true &&
//       eventStartDate_.getTime() >= now.getTime() &&
//       salesStartDate_.getTime() >= now.getTime()
//     ) {
//       upcominglist.push(item);
//     }
//   });
//   console.log(upcominglist);
//   return upcominglist;
// }

export async function getAttendeeUpcomingEventsByOrganiserId(eoId) {
  const { data } = await api.get(`/api/organiser/event/${eoId}`);
  let upcominglist = [];
  console.log(data);

  data.forEach((item) => {
    var now = new Date();
    var eventStartDate_ = new Date(item.eventStartDate);
    var salesStartDate_ = new Date(item.saleStartDate);

    if (
      item.eventStatus === 'UPCOMING' &&
      item.published === true &&
      eventStartDate_.getTime() >= now.getTime() &&
      salesStartDate_.getTime() >= now.getTime()
    ) {
      upcominglist.push(item);
    }
  });

  return upcominglist;
}

export async function getPartnerCurrentEventsByOrganiserId(eoId) {
  const { data } = await api.get(`/api/organiser/event/${eoId}`);
  let currentlist = [];
  // booth application started
  data.forEach((item) => {
    var now = new Date();
    var eventStartDate_ = new Date(item.eventStartDate);
    var salesStartDate_ = new Date(item.saleStartDate);
    if (
      item.eventStatus !== 'CANCELLED' &&
      item.hidden === false &&
      eventStartDate_.getTime() >= now.getTime() &&
      salesStartDate_.getTime() >= now.getTime()
    ) {
      currentlist.push(item);
    }
  });
  return currentlist;
}

export async function getAttendeeCurrentEventsByOrganiserId(eoId) {
  const { data } = await api.get(`/api/organiser/event/${eoId}`);
  let currentlist = [];

  // ticket sales started and booth application false
  data.forEach((item) => {
    var now = new Date();
    var eventStartDate_ = new Date(item.eventStartDate);
    var salesStartDate_ = new Date(item.saleStartDate);
    var salesEndDate_ = new Date(item.salesEndDate_);
    if (
      item.eventStatus !== 'CANCELLED' &&
      item.published === true &&
      eventStartDate_.getTime() >= now.getTime() &&
      salesStartDate_.getTime() <= now.getTime() &&
      salesEndDate_ >= now.getTime()
    ) {
      currentlist.push(item);
    }
  });
  return currentlist;
}

export async function getPastEventsByOrganiserId(eoId) {
  const { data } = await api.get(`/api/organiser/event/${eoId}`);
  let completedlist = [];
  data.forEach((item) => {
    if (item.eventStatus === 'COMPLETED') {
      completedlist.push(item);
    }
  });
  return completedlist;
}