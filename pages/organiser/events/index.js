import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { connect } from "react-redux";
import { BreadcrumbOne } from '../../../components/Breadcrumb';
import { Container, Row, Col } from "react-bootstrap";
import OrganiserWrapper from '../../../components/wrapper/OrganiserWrapper';
import { getAllEvents } from "../../../lib/query/eventApi";
import { LayoutOne } from "../../../layouts";
import { Sidebar, ShopHeader, ShopProducts } from "../../../components/Shop";



function myEvents() {
    const [events, setEvents] = useState([]);
    //test
    const [layout, setLayout] = useState("list");
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    const pageLimit = 12;


    useEffect(() => {
        const getEvents = async () => {
            const data = await getAllEvents();
            setEvents(data);
        }
        getEvents();
        // setCurrentData(events.slice(offset, offset + pageLimit));
    });

    return (
        <div>

            <OrganiserWrapper title="Events">
                <BreadcrumbOne pageTitle="My Events">
                    <ol className="breadcrumb justify-content-md-end">
                        <li className="breadcrumb-item">
                            <Link href="/organiser/events">
                                <a>Events</a>
                            </Link>
                        </li>
                    </ol>
                </BreadcrumbOne>
            </OrganiserWrapper>

            <Container>

            </Container>


        </div>

    )
}

export default myEvents;
