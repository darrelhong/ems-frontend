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
import { getFollowers, getFollowing } from '../lib/query/getBPFollow';
import { BsPencilSquare } from 'react-icons/bs';

const PartnerProfile = ({ localuser }) => {
    const [publicView, setPublicView] = useState();

    // const [events, setEvents] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(async () => {
        console.log("user " + localuser);
        if (localStorage.getItem('userId') != null) {
            await getUser(localStorage.getItem('userId')).then((data) => {
                if (data?.id !== localuser) {
                    setPublicView(true);
                } else {
                    console.log('test false');
                    setPublicView(false);
                }
            });
        } else {
            setPublicView(true);
        }
        await getFollowers(localuser).then((data) => {
            setFollowers(data);
        });
        await getFollowing(localuser).then((data) => {
            setFollowing(data);
        });
    }, []);

    const { data: partner } = useUser(localuser);

    return (
        <>
            <BreadcrumbOne pageTitle="Partner Profile Details">
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
                                        {partner?.profilePic == null && (
                                            <Image
                                                src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                                className="avatar border-gray"
                                                thumbnail
                                            />
                                        )}
                                        {partner?.profilePic != null && (
                                            <Image
                                                className="avatar border-gray"
                                                src={partner?.profilePic}
                                                thumbnail
                                            />
                                        )}
                                        <h5 className="title">{partner?.name}</h5>
                                    </a>
                                    <p className="description">{partner?.email}</p>
                                </div>
                                <p className="description text-center">
                                    {(partner?.description === null &&
                                        'There is no description.') ||
                                        partner?.description}
                                </p>
                                <div className="description text-center">
                                    <h5>
                                        Category :
                      <span>
                                            {' '}
                                            <Badge variant="primary">
                                                {partner?.businessCategory}
                                            </Badge>{' '}
                                        </span>
                                    </h5>
                                </div>
                            </CardBody>
                            <br></br>
                            <CardFooter>
                                <hr />
                                <div className="button-container">
                                    <Row>
                                        <Col className="ml-auto" lg="4" md="6" xs="6">
                                            <h5>
                                                {followers.length} <br />
                                                <small>Followers</small>
                                            </h5>
                                        </Col>
                                        <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                                            <h5>
                                                {following.length} <br />
                                                <small>Following</small>
                                            </h5>
                                        </Col>
                                        <Col className="mr-auto" lg="4">
                                            <h5>
                                                {!publicView && (<Link href="/partner/profile-account">
                                                    <button
                                                        className="btn btn-fill-out btn-sm"
                                                        name="edit"
                                                        value="edit"
                                                        size="sm"
                                                    >
                                                        <BsPencilSquare />
                                                    </button>
                                                </Link>)}
                                                {publicView && (
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
                                        <Nav.Item>
                                            <Nav.Link eventKey="Following">FOLLOWING</Nav.Link>
                                        </Nav.Item>
                                    </Nav>

                                    <Tab.Content>
                                        <Tab.Pane eventKey="Events">
                                            <br></br>
                                            <span>There are currently no events.</span>
                                            {/* <div className="product-description-tab__details">
                  
                    <EventsProfile
                      current={events}
                    //   upcoming="bestSellerProducts"
                    //  past="featuredProducts"
                    />
                  </div> */}
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="Followers">
                                            <br></br>
                                            <ul className="list-unstyled team-members">
                                                {followers != undefined &&
                                                    followers.map((follower) => {
                                                        return (
                                                            <li>
                                                                <br></br>
                                                                <Row>

                                                                    <Col md="1" xs="1"> &nbsp;</Col>
                                                                    <Col md="2" xs="2">
                                                                        <div className="avatar">
                                                                            {/* <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                            /> */}
                                                                            {follower?.profilePic == null && (
                                                                                <img
                                                                                    src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                                                                    className="img-circle img-no-padding img-responsive"
                                                                                />
                                                                            )}
                                                                            {follower?.profilePic != null && (
                                                                                <Image
                                                                                    className="img-circle img-no-padding img-responsive"
                                                                                    src={follower?.profilePic}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </Col>
                                                                    <Col md="6" xs="6">
                                                                        {/* <br></br> */}
                                                                        {follower.name} <br />
                                                                        <span className="text-muted">
                                                                            {follower.email}
                                                                        </span>
                                                                        <div>
                                                                            {!follower.categoryPreferences.isEmpty &&
                                                                                follower.categoryPreferences.map(
                                                                                    (eventtype) => {
                                                                                        return (
                                                                                            <span>
                                                                                                {' '}
                                                                                                <Badge variant="primary">
                                                                                                    {eventtype}
                                                                                                </Badge>{' '}
                                                                                            </span>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                        </div>
                                                                    </Col>
                                                                    <Col className="text-right" md="1" xs="1">
                                                                        <br></br>
                                                                        <Button
                                                                            className="btn-round btn-icon"
                                                                            color="success"
                                                                            outline
                                                                            size="sm"
                                                                        >
                                                                            Select
                            {/* <i className="fa fa-envelope" /> */}
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </li>
                                                        )
                                                    })}
                                            </ul>
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="Following">
                                            <br></br>
                                            <ul className="list-unstyled team-members">
                                                {following != undefined &&
                                                    following.map((following) => {
                                                        return (
                                                            <li>
                                                                <br></br>
                                                                <Row>
                                                                    <Col md="1" xs="1"> &nbsp;</Col>
                                                                    <Col md="2" xs="2">
                                                                        <div className="avatar">
                                                                            {following?.profilePic == null && (
                                                                                <img
                                                                                    src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                                                                    className="img-circle img-no-padding img-responsive"
                                                                                />
                                                                            )}
                                                                            {following?.profilePic != null && (
                                                                                <Image
                                                                                    className="img-circle img-no-padding img-responsive"
                                                                                    src={following?.profilePic}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </Col>
                                                                    <Col md="6" xs="6">
                                                                        {/* <br></br> */}
                                                                        <Link
                                                                            href={{
                                                                                pathname:
                                                                                    '/organiser/organiser-profile',
                                                                                query: {
                                                                                    paraId: JSON.stringify(
                                                                                        following?.id
                                                                                    ),
                                                                                },
                                                                            }}
                                                                        >
                                                                            {following.name}
                                                                        </Link> <br />
                                                                        <span className="text-muted">
                                                                            {following.email}
                                                                        </span>
                                                                        <div>
                                                                        <span className="text-muted">
                                                                            {following.description}
                                                                        </span>
                                                                        </div>

                                                                    </Col>
                                                                    <Col className="text-right" md="1" xs="1">
                                                                        <br></br>
                                                                        <Button
                                                                            className="btn-round btn-icon"
                                                                            color="success"
                                                                            outline
                                                                            size="sm"
                                                                        >
                                                                            Select

                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </li>
                                                        )
                                                    })}
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


export default PartnerProfile;
