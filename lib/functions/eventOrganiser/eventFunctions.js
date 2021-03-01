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