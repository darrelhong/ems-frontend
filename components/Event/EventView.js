import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { Row } from "react-bootstrap";
import { useToasts } from 'react-toast-notifications';
import { handleCancel, handleDelete } from "../../lib/functions/eventOrganiser/eventFunctions";

const EventView = ({ events, layout }) => {
    const [currEvents, setCurrEvents] = useState(events);

    // console.log("ALL EVENTS: ", events);
    // console.log("event state: ", currEvents);

    useEffect(() => {
        if (events) {
            setCurrEvents(events);
        }
    })
    // const { addToast, removeToast } = useToasts();

    // const createToast = (message, appearanceStyle) => {
    //     const toastId = addToast(message, { appearance: appearanceStyle });
    //     setTimeout(() => removeToast(toastId), 3000);
    // };

    const deleteCancelButton = (event) => {
        if (event.eventBoothTransactions?.length == 0 && event.ticketTransactions?.length == 0) {
            handleCancel(event);
        } else {
            handleDelete(event);
        }
    };

    return (
        <div className="shop-products">
            <Row className={layout}>
                {currEvents &&
                    currEvents.map((event) => {
                        return (
                            <EventCard
                                key={event.eid}
                                event={event}
                                deleteCancelButton={deleteCancelButton}
                            />
                        );
                    })
                }
            </Row>
        </div>
    );

}

export default EventView;