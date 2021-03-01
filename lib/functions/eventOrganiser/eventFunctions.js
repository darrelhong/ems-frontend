import { updateEvent, deleteEvent } from '../../query/eventApi';

export async function publishToggle(event) {
    const published = !event.published;
    const updatedEvent = await updateEvent({ ...event, published });
    return updatedEvent; //returns boolean value
};

export async function hideToggle(event) {
    const hidden = !event.hidden;
    const updatedEvent = await updateEvent({ ...event, hidden });
    return updatedEvent;
};

export async function vipToggle(event) {
    const vip = !event.vip;
    const updatedEvent = await updateEvent({ ...event, vip });
    return updatedEvent;
};

export async function handleCancel(event) {
    try {
        const eventStatus = "CANCELLED";
        const updatedEvent = await updateEvent({ ...event, eventStatus });
        return updatedEvent;
    } catch (e) {
        return false;
    }
}

//lol these two returning boolean values might be a bit dumb, you can change it if needed
//i need the updated event to be returned so i doing it like this but lmk if you need to return sth else instead

export async function handleDelete(event) {
    try {
        await deleteEvent(event.eid);
        return true;
        //navigate to somewhere
    } catch (e) {
        return false;
    }
};

export function eventToHideToggle(event) {
    let output = {
        hideBoth: false,
        hideFromAttendee: false,
        showBoth: false
    }
    if (event.published == false && event.hidden == true) {
        // console.log('hideBoth');
        let hideBoth = true;
        return 'hideBoth';
        // return ({...output, hideBoth});
    } else if (event.published && !event.hidden) {
        // console.log('showBoth');
        let showBoth = true;
        return 'showBoth';
        // return ({...output, showBoth});
    } else if (!event.published && !event.hidden) {
        // console.log('hidefromattendee');
        let hideFromAttendee = true;
        // return ({...output, hideFromAttendee});
        return 'hideFromAttendee';
    }
};

export async function updateEventHidden(event, hiddenStatus) {
    const formattedEventData = addHideInfoToEvent(event,hiddenStatus);
    const updatedEvent = await updateEvent(formattedEventData);
    return updatedEvent;
};

export function addHideInfoToEvent(event, hiddenStatus) {
    //hidden status we are expecting the JSON of 3 boolean values, hideBoth, hideFromAttendee, showBoth
    let published; //publish is for attendee
    let hidden; //hide is for BP
    if (hiddenStatus.hideBoth) {
        published = false;
        hidden = true;
    } else if (hiddenStatus.hideFromAttendee) {
        //hide from attendee but show to BP
        published = false;
        hidden = false;
    } else if (hiddenStatus.showBoth) {
        published = true;
        hidden = false;
    } else { //shouldnt happen but in case
        published = null;
        hidden = null;
    }
    return ({...event, published, hidden});
};