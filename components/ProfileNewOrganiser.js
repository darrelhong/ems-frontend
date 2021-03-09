import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";
import EventTabOne from '../components/EventTabEoProfile';
import FollowersTabEoProfile from '../components/FollowersTabEoProfile';
import { ProductRating } from '../components/Product';
import useUser from '../lib/query/useUser';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BreadcrumbOne } from '../components/Breadcrumb';
import { Container } from 'react-bootstrap';
import { getUser } from '../lib/query/getUser';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { BsPencilSquare } from 'react-icons/bs';
import {
    getEventByOrganiserId,
    getPastEventsByOrganiserId,
    getAttendeeCurrentEventsByOrganiserId,
    getPartnerCurrentEventsByOrganiserId,
    getPartnerUpcomingEventsByOrganiserId,
    getAttendeeUpcomingEventsByOrganiserId,
    getRating,
} from '../lib/query/useEvent';
import { getOrgAttendeeFollowers } from '../lib/query/getOrgAttendeeFollowers';
import { getOrgPartnerFollowers } from '../lib/query/getOrgPartnerFollowers';

const EventOrgProfile = ({ paraId_ }) => {
    const [showEoView, setShowEoView] = useState(false);
    const [showPublicView, setShowPublicView] = useState(false);
    const [userRole, setUserRole] = useState('');
    //const [eventlist, setEventlist] = useState([]);
    const [currenteventlist, setCurrenteventlist] = useState([]);
    const [upcomingeventlist, setUpcomingeventlist] = useState([]);
    const [pasteventlist, setPastEventlist] = useState([]);
    const [eventorganiser, setEventOrganiser] = useState();

    const [attendeeFollowers, setAttendeeFollowers] = useState([]);
    const [partnerFollowers, setPartnerFollowers] = useState([]);
    const [rating, setRating] = useState();

    // if there is user login credential
    //const paraId_ = JSON.parse(query.paraId);

    // ADMIN: 'admin',
    // EVNTORG: 'organiser',
    // BIZPTNR: 'partner',
    // ATND: 'attendee',

    useEffect(async () => {
        await getUser(paraId_).then((eventOrg) => {
            console.log('eo data');
            console.log(eventOrg);

            setEventOrganiser(eventOrg);
        });

        await getOrgAttendeeFollowers(paraId_).then((followers) => {
            setAttendeeFollowers(followers);
        });

        await getOrgPartnerFollowers(paraId_).then((followers) => {
            setPartnerFollowers(followers);
        });

        await getRating(paraId_).then((rate) => {
            setRating(rate);
            console.log("rating" + rating);
        });
        //const { data: user } = useUser(localStorage.getItem('userId'));

        if (localStorage.getItem('userId') != null) {
            await getUser(localStorage.getItem('userId')).then(async (data) => {
                console.log(data);
                if (data.id != null) {
                    if (data.roles[0].roleEnum === 'BIZPTNR') {
                        setUserRole('BIZPTNR');
                        await getPartnerCurrentEventsByOrganiserId(paraId_).then(
                            (events) => {
                                setCurrenteventlist(events);
                            }
                        );
                        setShowPublicView(true);
                        setShowEoView(false);
                        //partner has no upcoming events
                    } else if (
                        data.roles[0].roleEnum === 'ATND' ||
                        (data.roles[0].roleEnum === 'EVNTORG' && data.id != paraId_)
                    ) {
                        await getAttendeeCurrentEventsByOrganiserId(paraId_).then(
                            (events) => {
                                setCurrenteventlist(events);
                            }
                        );

                        await getAttendeeUpcomingEventsByOrganiserId(paraId_).then(
                            (events) => {
                                setUpcomingeventlist(events);
                            }
                        );

                        setShowPublicView(true);
                        setShowEoView(false);
                        // } else if (
                        //   data.roles[0].roleEnum === 'EVNTORG' &&
                        //   data.id != paraId_
                        // ) {
                        //   await getAttendeeCurrentEventsByOrganiserId(paraId_).then(
                        //     (events) => {
                        //       setCurrenteventlist(events);
                        //     }
                        //   );

                        //   await getAttendeeUpcomingEventsByOrganiserId(paraId_).then(
                        //     (events) => {
                        //       setUpcomingeventlist(events);
                        //     }
                        //   );
                        //   setShowPublicView(true);
                        //   setShowEoView(false);
                        // }
                    } else if (
                        data.roles[0].roleEnum === 'EVNTORG' &&
                        data.id == paraId_
                    ) {
                        await getAttendeeCurrentEventsByOrganiserId(paraId_).then(
                            (events) => {
                                setCurrenteventlist(events);
                            }
                        );

                        await getAttendeeUpcomingEventsByOrganiserId(paraId_).then(
                            (events) => {
                                setUpcomingeventlist(events);
                            }
                        );

                        setShowPublicView(false);
                        setShowEoView(true);
                    }
                    // past events all the same for all users.
                    await getPastEventsByOrganiserId(paraId_).then((events) => {
                        setPastEventlist(events);
                    });
                }
            });
        } else if (localStorage.getItem('userId') == null) {
            await getAttendeeCurrentEventsByOrganiserId(paraId_).then((events) => {
                setCurrenteventlist(events);
            });

            await getAttendeeUpcomingEventsByOrganiserId(paraId_).then((events) => {
                setUpcomingeventlist(events);
            });

            await getPastEventsByOrganiserId(paraId_).then((events) => {
                setPastEventlist(events);
            });
            setShowPublicView(true);
            setShowEoView(false);
        }
    }, []);


    return (
        <>
            <BreadcrumbOne pageTitle="Organiser Profile Details">
                <ol className="breadcrumb justify-content-md-end">
                    <li className="breadcrumb-item">
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">Profile Details</li>
                </ol>
            </BreadcrumbOne>
            <br></br>
            <div className="content" style={{ marginLeft: "8%", marginRight: "8%" }}>
                <Row>
                    <Col md="4">
                        <Card className="card-user">
                            <div className="image">
                                {/* <img
                    alt="..."
                    src={require("assets/img/damir-bosnjak.jpg")}
                  /> */}
                            </div>
                            <CardBody>
                                <div className="author">
                                    {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                      /> */}
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        {eventorganiser?.profilePic == null && (
                                            <Image
                                                src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                                className="avatar border-gray"
                                                thumbnail
                                            />
                                        )}
                                        {eventorganiser?.profilePic != null && (
                                            <Image
                                                className="avatar border-gray"
                                                src={eventorganiser?.profilePic}
                                                thumbnail
                                            />
                                        )}
                                        <h5 className="title">{eventorganiser?.name}</h5>
                                    </a>
                                    <p className="description">{eventorganiser?.email}</p>
                                </div>
                                <p className="description text-center">
                                    {(eventorganiser?.description === null &&
                                        'There is no description.') ||
                                        eventorganiser?.description}
                                </p>
                                <div className="description text-center">
                                    <div className="product-content__rating-wrap">
                                        <div className="product-content__rating">
                                            {/* {rating != null && rating != undefined && ( */}
                                            <ProductRating ratingValue={5} />
                                            {/* )} */}
                                            {/* {(rating == undefined || rating == null) && (
                                            <span> (0) </span>
                                            )}
                                            {rating >= 0 && <span>({rating})</span>} */}
                                            <span>({5})</span>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                            <br></br>
                            <CardFooter>
                                <hr />
                                <div className="button-container">
                                    <Row>
                                        <Col className="ml-auto" lg="4" md="6" xs="6">
                                            <h5>
                                                {attendeeFollowers.length + partnerFollowers.length} <br />
                                                <small>Followers</small>
                                            </h5>
                                        </Col>
                                        {/* <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                                            <h5>
                                                {following.length} <br />
                                                <small>Following</small>
                                            </h5>
                                        </Col> */}
                                        <Col className="mr-auto" lg="4">
                                            <h5>
                                                {showEoView && (<Link href="/partner/profile-account">
                                                    <button
                                                        className="btn btn-fill-out btn-sm"
                                                        name="edit"
                                                        value="edit"
                                                        size="sm"
                                                    >
                                                        <BsPencilSquare />
                                                    </button>
                                                </Link>)}
                                                {showPublicView && (
                                                    <button
                                                        type="submit"
                                                        className="btn btn-fill-out btn-sm"
                                                        name="submit"
                                                        value="Submit"
                                                    >
                                                        Follow
                                                    </button>
                                                )}


                                                <br />
                                                {/* <small>Spent</small> */}
                                            </h5>
                                        </Col>
                                    </Row>
                                    <br></br>

                                </div>
                            </CardFooter>
                        </Card>

                    </Col>
                    <Col md="8">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Profile Details</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Tab.Container defaultActiveKey="Events">
                                    <Nav
                                        variant="pills"
                                        className="product-description-tab__navigation"
                                    >
                                        <Nav.Item>
                                            <Nav.Link eventKey="Events">EVENTS</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="Followers">FOLLOWERS</Nav.Link>
                                        </Nav.Item>

                                    </Nav>

                                    <Tab.Content>
                                        <Tab.Pane eventKey="Events">
                                            <br></br>
                                            <div className="product-description-tab__details">
                                                {userRole === 'BIZPTNR' && (
                                                    <EventTabOne
                                                        current={currenteventlist}
                                                        past={pasteventlist}
                                                    />
                                                )}
                                                {userRole !== 'BIZPTNR' && (
                                                    <div className="product-description-tab__additional-info">
                                                        <EventTabOne
                                                            current={currenteventlist}
                                                            upcoming={upcomingeventlist}
                                                            past={pasteventlist}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                        </Tab.Pane>
                                        <Tab.Pane eventKey="Followers">
                                            <br></br>
                                            <ul className="list-unstyled team-members">
                                            <div className="product-description-tab__additional-info">
                                                    <FollowersTabEoProfile
                                                    attendees={attendeeFollowers}
                                                    partners={partnerFollowers}
                                                    showPublicView ={showPublicView}
                                                    />
                                                </div>
                                            </ul>
                                        </Tab.Pane>


                                    </Tab.Content>
                                </Tab.Container>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}


export default EventOrgProfile;
