import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { Row, Modal, Button } from "react-bootstrap";
import { useToasts } from 'react-toast-notifications';
import { handleCancel, handleDelete } from "../../lib/functions/eventOrganiser/eventFunctions";

const EventView = ({ events, layout }) => {
    const [currEvents, setCurrEvents] = useState(events);
    // const [deleteModalShow, setDeleteModalShow] = useState(true);

    // const closeModal = () => setDeleteModalShow(false);

    // console.log("ALL EVENTS: ", events);
    // console.log("event state: ", currEvents);

    useEffect(() => {
        if (events) {
            setCurrEvents(events);
        }
    })
    const { addToast, removeToast } = useToasts();

    const createToast = (message, appearanceStyle) => {
        const toastId = addToast(message, { appearance: appearanceStyle });
        setTimeout(() => removeToast(toastId), 3000);
    };

    const deleteCancelEvent = async (event) => {
        console.log("trying to delete this: ", event);
        if (event.eventBoothTransactions?.length == 0 && event.ticketTransactions?.length == 0) {
            await handleDelete(event).then(
                (output) => {
                    console.log(output);
                    output ? createToast("Event has been successfully deleted", "success") :
                        createToast("An Error occured while trying to delete this event", "warning");
                });
        } else {
            await handleCancel(event).then(
                (output) => {
                    console.log(output);
                    (output === false) ? createToast("An Error occured while trying to cancel this event", "warning") :
                        createToast("Event has been successfully cancelled", "success");
                }
            );
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
                                deleteCancelEvent={deleteCancelEvent}
                                createToast={createToast}
                            />
                        );
                    })
                }
            </Row>
        </div>
    );

export default EventView;
