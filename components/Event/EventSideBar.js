import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import EventView from "./EventView";

const EventSideBar = ({ events, layout }) => {

    return (
        <div className='my-account-content space-pt--r100 space-pb--r100'>
            <Container>
                <Tab.Container defaultActiveKey="all">
                    <Row>
                        <Col lg={3} md={4}>
                            <Nav variant="pills"
                                className="flex-column my-account-content__navigation space-mb--r60" >
                                <Nav.Item>
                                    <Nav.Link eventKey="all">
                                        All
                                </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="upcoming">
                                        Upcoming
                                </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="completed">
                                        Completed
                                </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="draft">
                                        Draft
                                </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="cancelled">
                                        Cancelled
                                </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col lg={9} md={8} >
                            <Tab.Content>
                                <Tab.Pane eventKey="all">
                                    <EventView events={events} layout={layout} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </div>
    )

}

export default EventSideBar;