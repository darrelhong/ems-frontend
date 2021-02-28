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
        if (event.eventStatus == 'CANCELLED') {
            return (
                <button
                    disabled
                    className="btn btn-fill-out btn-addtocart space-ml--10"
                    style={{ marginLeft: 'auto', marginRight: 'auto', pointerEvents: "none" }}
                >
                    <i className="icon-basket-loaded" /> Cancelled Event
                </button>
            )
        } else if (event.eventBoothTransactions?.length == 0 && event.ticketTransactions?.length == 0) {
            //in this case we can delete
            return (
                <button
                    onClick={() => handleCancelDelete("delete")}
                    disabled={event.eventStatus == 'DELETED'}
                    className="btn btn-fill-out btn-addtocart space-ml--10"
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                >
                    <i className="icon-basket-loaded" /> Delete Event
                </button>
            )
        } else {
            //only can cancel, cannot delete
            return (
                <button
                    onClick={() => handleCancelDelete("cancel")}
                    className="btn btn-fill-out btn-addtocart space-ml--10"
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                >
                    <i className="icon-basket-loaded" /> Cancel Event
                </button>
            )
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
                            <IconButton aria-label="delete" color="secondary">
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
                                <span className="price">${event.ticketPrice}</span>
                                <span className="rating-num"> {`Sales End Date: ${formatDate(event.salesEndDate)}`} </span>
                            </div>
                        </div>
                        <div className="product-description">
                            {event.descriptions}
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
                                    <IconButton aria-label="Hide" color="warning" onClick={hideToggle}>
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