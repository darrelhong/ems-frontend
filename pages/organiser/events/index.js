import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { connect } from "react-redux";
import { BreadcrumbOne } from '../../../components/Breadcrumb';
import { Container, Row, Col } from "react-bootstrap";
import OrganiserWrapper from '../../../components/wrapper/OrganiserWrapper';
import api from "../../../lib/ApiClient";


function myEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const { data } = await api.get("/api/event/all");

            setEvents(data);
        }
        getEvents();
    }, []);

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

                <div className="shop-content space-pt--r100 space-pb--r100">
                    <Container>
                        <Row>
                            <Col lg={9}>
                                <ShopHeader
                                    getLayout={getLayout}
                                    getFilterSortParams={getFilterSortParams}
                                    shopTopFilterStatus={shopTopFilterStatus}
                                    setShopTopFilterStatus={setShopTopFilterStatus}
                                    layout={layout} />

                                <EventView events={events} layout={layout} />
                            </Col>
                        </Row>
                    </Container>
                </div>


            </OrganiserWrapper>

        </div>

    )
}

export default myEvents;
