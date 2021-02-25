import React from "react";
import { Fragment } from "react";
import Link from "next/link";
import { Col } from "react-bootstrap";
import { formatDate } from '../../lib/formatDate'

const EventCard = ({ event }) => {
    return (
        <Fragment>
            <Col
                lg={4}
                sm={6}
            >
                <div className="product-list">
                    <div className="product-list__image">
                        <Link
                            href={`/organiser/event/1`}>
                            <a>
                                <img src="nil" alt="event_image" />
                            </a>
                        </Link>
                    </div>

                    <div className="product-list__info">
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
                                    {/* Require to be changed */}
                                    <Link href={`/organiser/events`}>
                                        <a className="btn btn-fill-out btn-addtocart">
                                            <i className="icon-basket-loaded" /> Add To Cart
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </ Col>
        </Fragment>
    )
};

export default EventCard;