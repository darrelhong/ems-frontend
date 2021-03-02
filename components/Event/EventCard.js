import React, { useState } from "react";
import { Fragment } from "react";
import Link from "next/link";
import { Col } from "react-bootstrap";
import { formatDate } from '../../lib/formatDate'
import { ProgressBar } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import HidePopover from './HidePopover';
import { vipToggle } from "../../lib/functions/eventOrganiser/eventFunctions";

const EventCard = ({ event, deleteCancelButton, createToast }) => {
    const [currEvent, setCurrEvent] = useState(event);

    const handleDeleteCancel = async (currEvent) => {
        deleteCancelButton(currEvent);
        createToast("Event Successfully cancelled", 'success');
    }

    const handleVipToggle = async (currEvent) => {
        let message = '';
        await vipToggle(currEvent).then((updatedEvent) => {
            setCurrEvent(updatedEvent);
            updatedEvent.vip ? message = "Event is exclusive to VIP members" : message = "Event open for all!";
            createToast(message, 'success');
        });
    }

    return (
        <Fragment>
            <Col
                lg={4}
                sm={6}
                className="space-mb--50"
            >
                <div className="product-list">
                    <div className="product-list__image">
                        <Link
                            href={`/organiser/event/1`}>
                            <a>
                                <img src={`https://storage.googleapis.com/ems-images/events/event-${currEvent.eid}/image-1.jpg`} alt="event_image" />
                            </a>
                        </Link>
                    </div>

                    <div className="product-list__info">

                        <span style={{ float: "right" }}>
                            <IconButton onClick={() => handleDeleteCancel()} aria-label="delete" color="secondary">
                                <DeleteIcon />
                            </IconButton>
                        </span>

                        <h6 className="product-title">
                            <Link
                                // Require to be changed
                                href={`/organiser/events/`}>
                                <a>{currEvent.name}</a>
                            </Link>
                        </h6>


                        <div className="d-flex justify-content-between">
                            <div className="product-price">
                                <span className="price"> {formatDate(currEvent.eventStartDate, "eee, dd MMM yyyy, hh:mmbbb")}</span>
                                {/* <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> */}
                                {/* <span className="rating-num"> {`Sales End Date: ${formatDate(event.salesEndDate)}`} </span> */}
                            </div>
                        </div>
                        <div className="product-description">
                            {currEvent.descriptions}
                        </div>

                        <div>
                            <span className="price">Ticket Price: ${currEvent.ticketPrice}</span>
                        </div>

                        <div className="d-flex justify-content-between">
                            <span className="rating-num"> {`Date: ${formatDate(currEvent.saleStartDate)} ~ ${formatDate(currEvent.salesEndDate)}`} </span>
                        </div>

                        <div className="product-list__actions">
                            <ul>
                                {/* <li>
                                    <IconButton aria-label="Hide" color="primary" onClick={publishToggle}>
                                        {event.published ?
                                            (<PublishIcon />) :
                                            (<PublishIcon disabled />)
                                        }
                                    </IconButton>
                                </li> */}

                                {/* <li>
                                    <IconButton aria-label="Hide" color="default" onClick={hideToggle}>
                                        {event.hidden ?
                                            (<VisibilityIcon />) :
                                            (<VisibilityOffIcon />)
                                        }
                                    </IconButton>
                                </li> */}

                                {/* Handles logic for toggling visibility of events for Business Partners and Attendees */}
                                <li>
                                    <HidePopover event={currEvent} />
                                </li>

                                <li>
                                    <IconButton aria-label="vip" color="secondary" onClick={() => handleVipToggle(currEvent)}>
                                        {currEvent.vip ?
                                            (<StarIcon />) :
                                            (<StarBorderIcon />)
                                        }
                                    </IconButton>
                                </li>

                                <ProgressBar animated now={60} label="60%" style={{ width: "50%", float: "right" }} />
                                {event.ticketCapacity}
                            </ul>
                        </div>
                    </div>
                </div>
            </ Col>
        </Fragment>
    )
};

export default EventCard;