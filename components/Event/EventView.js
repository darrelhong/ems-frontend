import React from 'react';
import EventCard from './EventCard';
import { Row } from "react-bootstrap";
import { useToasts } from 'react-toast-notifications';
import { updateEvent } from '../../lib/query/eventApi';

const EventView = ({ events, layout }) => {
    const { addToast, removeToast } = useToasts();

    const createToast = (message, appearanceStyle) => {
        const toastId = addToast(message, { appearance: appearanceStyle });
        setTimeout(() => removeToast(toastId), 3000);
    };

    const publishToggle = async () => {
        const published = !event.published;
        const updatedEvent = await updateEvent({ ...event, published });
        setEvent(updatedEvent);
        let message = '';
        published ? message = "Published Successfully" : message = "Event unpublished";
        createToast(message, 'success');
    };

    const hideToggle = async () => {
        const hidden = !event.hidden;
        const updatedEvent = await updateEvent({ ...event, hidden });
        setEvent(updatedEvent);
        let message = '';
        hidden ? message = "Event Hidden" : message = "Event now visible to business partners!";
        createToast(message, 'success');
    };


    const vipToggle = async () => {
        const vip = !event.vip;
        const updatedEvent = await updateEvent({ ...event, vip });
        setEvent(updatedEvent);
        let message = '';
        vip ? message = "Event is exclusive to VIP members!" : message = "Event open for all!";
        createToast(message, 'success');
    };

    const handleCancelDelete = async (operation) => {
        if (operation == 'cancel') {
            const eventStatus = "CANCELLED";
            try {
                const updatedEvent = await updateEvent({ ...event, eventStatus });
                setEvent(updatedEvent);
                createToast('Event successfully cancelled', 'success');
            } catch (e) {
                createToast('Error cancelling the event', 'error');
            }
        } else {
            const eventStatus = "DELETED";
            try {
                const updatedEvent = await updateEvent({ ...event, eventStatus });
                setEvent(updatedEvent);
                createToast('Event successfully deleted!', 'success');
            } catch (e) {
                createToast('Error deleting the event', 'error');
            }
        }
    };


    return (
        <div className="shop-products">
            <Row className={layout}>
                {events &&
                    events.map((event) => {
                        return (
                            <EventCard
                                key={event.eid}
                                event={event}
                                publishToggle={publishToggle}
                                hideToggle={hideToggle}
                                vipToggle={vipToggle}
                                handleCancelDelete={handleCancelDelete} />
                        );
                    })
                }
            </Row>
        </div>
    );

}

export default EventView;