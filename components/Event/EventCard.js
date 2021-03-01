import React from "react";
import { Fragment } from "react";
import Link from "next/link";
import { Col } from "react-bootstrap";
import { formatDate } from '../../lib/formatDate'
import { ProgressBar } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PublishIcon from '@material-ui/icons/Publish';

const EventCard = ({ event, publishToggle, hideToggle, vipToggle, handleCancelDelete }) => {
    const deleteCancelButton = () => {
        if (event.eventBoothTransactions?.length == 0 && event.ticketTransactions?.length == 0) {
            handleCancelDelete('delete');
        } else {
            handleCancelDelete('cancel');
        }
    };
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
                                <img src="https://image.freepik.com/free-vector/cute-avocado-cartoon-hand-drawn-style_42349-476.jpg" alt="event_image" />
                            </a>
                        </Link>
                    </div>

                    <div className="product-list__info">

                        <span style={{ float: "right" }}>
                            <IconButton onClick={deleteCancelButton} aria-label="delete" color="secondary">
                                <DeleteIcon />
                            </IconButton>
                        </span>

                        <h6 className="product-title">
                            <Link
                                // Require to be changed
                                href={`/organiser/events/`}>
                                <a>{event.name}</a>
                            </Link>
                        </h6>


                        <div className="d-flex justify-content-between">
                            <div className="product-price">
                                <span className="price"> {formatDate(event.eventStartDate)}</span>
                                {/* <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> */}
                                {/* <span className="rating-num"> {`Sales End Date: ${formatDate(event.salesEndDate)}`} </span> */}
                            </div>
                        </div>
                        <div className="product-description">
                            {event.descriptions}
                        </div>

                        <div>
                            <span className="price">Ticket Price: ${event.ticketPrice}</span>
                        </div>

                        <div className="d-flex justify-content-between">
                            <span className="rating-num"> {`Sales Start Date: ${formatDate(event.salesStartDate)}`} </span>
                            <span className="rating-num"> {`Sales End Date: ${formatDate(event.salesEndDate)}`} </span>
                        </div>

                        <div className="product-list__actions">
                            <ul>
                                <li>
                                    <IconButton aria-label="Hide" color="primary" onClick={publishToggle}>
                                        {event.published ?
                                            (<PublishIcon />) :
                                            (<PublishIcon disabled />)
                                        }
                                    </IconButton>
                                </li>

                                <li>
                                    <IconButton aria-label="Hide" color="default" onClick={hideToggle}>
                                        {event.hidden ?
                                            (<VisibilityIcon />) :
                                            (<VisibilityOffIcon />)
                                        }
                                    </IconButton>
                                </li>

                                <li>
                                    <IconButton aria-label="vip" color="secondary" onClick={vipToggle}>
                                        {event.vip ?
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