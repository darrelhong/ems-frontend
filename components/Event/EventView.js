import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { Row, Modal, Button } from "react-bootstrap";
import { useToasts } from 'react-toast-notifications';
import { handleCancel, handleDelete } from "../../lib/functions/eventOrganiser/eventFunctions";

const EventView = ({ events, layout }) => {
    const [currEvents, setCurrEvents] = useState(events);
    const [deleteModalShow, setDeleteModalShow] = useState(true);

    const closeModal = () => setDeleteModalShow(false);

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

    const deleteCancelButton = (event) => {
        if (event.eventBoothTransactions?.length == 0 && event.ticketTransactions?.length == 0) {
            handleCancel(event);
        } else {
            handleDelete(event);
        }
    };

    return (

        <div className="shop-products">
            <Modal show={deleteModalShow} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Test Test</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" >
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


            <Row className={layout}>
                {currEvents &&
                    currEvents.map((event) => {
                        return (
                            <EventCard
                                key={event.eid}
                                event={event}
                                deleteCancelButton={deleteCancelButton}
                                createToast={createToast}
                            />
                        );
                    })
                }
            </Row>
        </div>
    );

}

export default EventView;