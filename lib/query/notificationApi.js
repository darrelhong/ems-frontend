import api from '../ApiClient';
import { getEventDetails } from './eventApi';
import { getUser } from 'lib/query/getUser';

//actor: EO
//recipients: BP and attendeees
// for:
// 1. update event (send to all attendees and BP)
// 2. cancel event (send to all attendees and BP)
export async function eventChangeNotif(eid,operation) {
    const endpoint = 'https://api.ravenhub.io/company/WLU2yLZw9d/broadcasts/C6se8c2BZm';
    const postBody = { notifications: [] };
    const attendees = []; //GET METHOD NEEDED HERE
    const partners = []; //GET METHOD FOR PARTNERS
    let title;
    let attendeeMessage;
    let partnerMessage;
    const urlVar = 'http://localhost:3000/attendee/events/${eid}';
    const eventDetails = await getEventDetails(eid);
    if (operation == 'update') {
        attendeeMessage = `${eventDetails.name ?? 'This event'} has been updated, please check it out by clicking the button below!`;
        partnerMessage = `${eventDetails.name ?? 'This event'} has been updated, please check it out by clicking the button below!`;
        title = `${eventDetails.eventName ?? 'Event'} updated`;
    } else { //CANCELLED
        attendeeMessage = `${eventDetails.name ?? 'This event'} has been cancelled, sorry for the inconvenience and you will be refunded the full amount.`;
        partnerMessage = `${eventDetails.name ?? 'This event'} has been cancelled, sorry for the inconvenience and you will be refunded the full amount.`;
        title = `${eventDetails.eventName ?? 'Event'} cancelled`;
    }
    for (const attendee in attendees) {
        postBody.notifications.push({
            subscriberId: 'attendee' + attendee.id,
            data: {
              title,
              message: attendeeMessage,
              urlVar
            },
          });
    };

    for (const partner in partners) {
        postBody.notifications.push({
            subscriberId: 'partner' + partner.id,
            data: {
              title,
              message: partnerMessage,
              urlVar
            },
          });
    };

    await api.post(endpoint, postBody, {
        headers: { 'Content-type': 'application/json' },
      });
};

//DONE
//actor: EO
//recipient: BP
//for approving an application
export async function approveBpNotif(id,eid) { //bpId then eid
    const endpoint = 'https://api.ravenhub.io/company/WLU2yLZw9d/subscribers/partner' + id + '/events/5UR52ChTLn';
    const event = await getEventDetails(eid);
    const eventName = event?.name;
    const title = `Approved application for ${eventName ?? 'an event'}`;
    const message = `Congratulations, your application for ${eventName ?? 'an event'} was successful. You will hear about your booth allocation soon!`;
    await api.post(
        endpoint,
        { title, message},
        {
          headers: { 'Content-type': 'application/json' },
        }
      );
};

//DONE
//actor: EO
//recipient: BP
//for rejecting an application
export async function rejectBpNotif(id, eid) { //bpId then eid
    const endpoint = 'https://api.ravenhub.io/company/WLU2yLZw9d/subscribers/partner' + id + '/events/5UR52ChTLn';
    const event = await getEventDetails(eid);
    const eventName = event?.name;
    const title = `Rejected application for ${eventName ?? 'an event'}`;
    const message = `Sorry, your application for ${eventName ?? 'an event'} was unsuccessful. Thank you for applying!`;
    await api.post(
        endpoint,
        { title, message},
        {
          headers: { 'Content-type': 'application/json' },
        }
      );
}

//actor: EO
//recipient: BP
export async function allocateBoothNotif(id) { //bpId
    const endpoint = 'https://api.ravenhub.io/company/WLU2yLZw9d/subscribers/partner' + id + '/events/s5ZV3jzQnP';
    const title = '';
    const message = '';
    api.post(
        endpoint,
        { title, message },
        {
          headers: { 'Content-type': 'application/json' },
        }
      );
}

//DONE
//actor: EO
//recipient" BP
export async function rsvpNotif(id, eid) { //bpId
    const endpoint =
    'https://api.ravenhub.io/company/WLU2yLZw9d/subscribers/partner' +
    id +
    '/events/cVuIV165Ri';
    const event = await getEventDetails(eid);
    const organiser = await getUser(id);
    const title = `Invitation to apply for ${event.eventName ?? 'this event'}`;
    const message = `Hi there! We at ${organiser?.name} are interested in collaborating and we hope you would apply for our event by clicking the button below!`;
    const urlVar = `http://localhost:3000/partner/events/${eid}`;
    
    api.post(
        endpoint,
        { title, message, urlVar },
        {
          headers: { 'Content-type': 'application/json' },
        }
      );
}

export async function newApplicationNotif(id,eid) {
  const endpoint = 'https://api.ravenhub.io/company/WLU2yLZw9d/subscribers/<subscriber_id>/events/BQu6jMjfGF';
  const bp = await getUser(id);
  const event = await getEventDetails(eid);
  const title = `${bp?.name ?? 'A partner'}'s application`;
  const message = `${bp?.name ?? 'A partner'} has applied for ${event.name ?? 'your event'}`;
  const urlVar = `http://localhost:3000/organiser/events/${eid}`;

api.post(
  endpoint,
  { title, message, urlVar},
  {
    headers: { 'Content-type': 'application/json' },
  }
);
}

//actor: BP
//recipient: EO
export async function withdrawApplicationNotif(id, eid) { //eoId and eventID
    let endpoint =
    'https://api.ravenhub.io/company/WLU2yLZw9d/subscribers/organiser' +
    id +
    '/events/I1c0CWDapO';

    const bp = await getUser(id);
    const event = await getEventDetails(eid);
    const title = `${bp?.name ?? 'A partner'}'s withdrawal`;
    const message = `${bp?.name ?? 'A partner'} has withdrawn from ${event.name ?? 'your event'}`;
    const urlVar = `http://localhost:3000/organiser/events/${eid}`;


  api.post(
    endpoint,
    { title, message, urlVar },
    {
      headers: { 'Content-type': 'application/json' },
    }
  );
}

