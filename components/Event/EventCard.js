import React from "react";
import { Fragment } from "react";
import Link from "next/link";
import { Col } from "react-bootstrap";
import { formatDate } from '../../lib/formatDate'
import { ProgressBar } from 'react-bootstrap';

const EventCard = ({ event }) => {
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
                        <h6 className="product-title">
                            <Link
                                // Require to be changed
                                href={`/organiser/events/`}>
                                <a>{event.name}</a>
                            </Link>
                        </h6>

                        <span>
                            <button>
                                <i className="icon-delete" />Delete
                            </button>
                        </span>

                        <div className="d-flex justify-content-between">
                            <div className="product-price">
                                <span className="price">${event.ticketPrice}</span>
                                <span className="rating-num"> {`Sales End Date: ${formatDate(event.salesEndDate)}`} </span>
                            </div>
                        </div>
                        <div className="product-description">
                            {event.descriptions}
                        </div>

                        <div>
                            <span>
                                <ProgressBar now={60} label="60%" />
                            </span>
                            <span>
                                {event.ticketCapacity}
                            </span>
                        </div>

                        <div className="product-list__actions">
                            <ul>
                                <li>
                                    <button className="btn btn-fill-out btn-addtocart space-ml--10">
                                        <i className="icon-basket-loaded" /> Publish
                                    </button>
                                </li>

                                <li>
                                    <button className="btn btn-fill-out btn-addtocart space-ml--10">
                                        <i className="icon-basket-loaded" /> Hide
                                    </button>
                                </li>

                                <li>
                                    <button className="btn btn-fill-out btn-addtocart space-ml--10">
                                        <i className="icon-basket-loaded" /> Make VIP
                                    </button>
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
