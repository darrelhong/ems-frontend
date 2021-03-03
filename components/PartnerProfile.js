import Link from 'next/link';
import { BreadcrumbOne } from '../components/Breadcrumb';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ProductRating } from '../components/Product';
import EventsProfile from '../components/ProductTab/EventsProfile';
import PartnerWrapper from '../components/wrapper/PartnerWrapper';
import useUser from '../lib/query/useUser';
import { useState, useEffect } from 'react';
//import {
//IoIosList,
//IoIosClipboard,
//IoIosDownload,
//IoIosCash,
//IoIosCreate,
//IoIosPerson,
//} from "react-icons/io";
import { getUser } from '../lib/query/getUser';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
// import getEvents from '../../lib/query/getEvents';
// import getFollowers from '../../lib/query/getFollowers';
// import getFollowing from '../../lib/query/getFollowing';
import { getFollowers, getFollowing } from '../lib/query/getBPFollow';
import { BsPencilSquare } from 'react-icons/bs';

import { FaHtml5 } from 'react-icons/fa';

const PartnerProfile = ({ localuser }) => {
  const [publicView, setPublicView] = useState();

  // const [events, setEvents] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(async () => {
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
    <div>
      {/* breadcrumb */}
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

      <div className="my-account-content space-pt--r100 space-pb--r100">
        <div>
          <Container>
            <Row md={{ span: 8 }} className="justify-content-md-center row">
              <Col xs={4} md={4}>
                <div className="profile-imgdiv">
                  {partner?.profilePic == null && (
                    <Image
                      src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                      className="profile-image"
                      thumbnail
                    />
                  )}
                  {partner?.profilePic != null && (
                    <Image
                      className="profile-image"
                      src={partner?.profilePic}
                      thumbnail
                    />
                  )}
                </div>
              </Col>
              <Col xs={4} md={4}>
                <Row>
                  <h2>{partner?.name}</h2>
                </Row>
                &nbsp;
                <div>
                  <Row>
                    <Col>
                      <Row>
                        <Col md={6} className="follow-number">
                          {(followers == undefined && (
                            <h4 style={{ color: '#ff324d' }}> 0 </h4>
                          )) ||
                            (followers.length > 0 && (
                              <h4 style={{ color: '#ff324d' }}>
                                {' '}
                                {followers.length}{' '}
                              </h4>
                            ))}
                          {/* </h4> */}
                        </Col>
                      </Row>
                      <Row>
                        <h5>Followers</h5>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Col md={6} className="follow-number">
                          {(following == undefined && (
                            <h4 style={{ color: '#ff324d' }}> 0 </h4>
                          )) ||
                            (following.length > 0 && (
                              <h4
                                style={{
                                  color: '#ff324d',
                                }}
                              >
                                {' '}
                                {following.length}{' '}
                              </h4>
                            ))}
                        </Col>
                      </Row>
                      <Row>
                        <h5>Following</h5>
                      </Row>
                    </Col>

                    {!publicView && (
                      <div>
                        &nbsp;
                        <Link href="/partner/profile-account">
                          <button
                            className="btn btn-fill-out btn-sm"
                            name="edit"
                            value="edit"
                            size="sm"
                          >
                            <BsPencilSquare />
                          </button>
                        </Link>
                      </div>
                    )}
                    {publicView && (
                      <div>
                        {' '}
                        &nbsp;
                        <button
                          type="submit"
                          className="btn btn-fill-out btn-sm"
                          name="submit"
                          value="Submit"
                        >
                          Follow
                        </button>
                      </div>
                    )}
                  </Row>
                </div>
                <div>
                  &nbsp;
                  <Row>
                    <h5>
                      Category :
                      <span>
                        {' '}
                        <Badge variant="primary">
                          {partner?.businessCategory}
                        </Badge>{' '}
                      </span>
                    </h5>
                  </Row>
                </div>
                <br></br>
              </Col>
            </Row>
          </Container>
        </div>
        <br></br>
        <Row className="justify-content-md-center">
          <Col md={{ span: 6 }}>
            <Tab.Container defaultActiveKey="Events">
              <Nav
                variant="pills"
                className="product-description-tab__navigation"
              >
                <Nav.Item>
                  <Nav.Link eventKey="Events">EVENTS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Description">DESCRIPTION</Nav.Link>
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
                <Tab.Pane eventKey="Description">
                  <br></br>
                  <div className="product-description-tab__additional-info">
                    {(partner?.description === null &&
                      'There is no description.') ||
                      partner?.description}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="Followers">
                  <br></br>
                  <div
                    style={{
                      overflowY: 'auto',
                      // border:'1px solid red',
                      // width:'500px',
                      overflowX: 'hidden',
                      height: '40vh',
                      position: 'relative',
                    }}
                  >
                    <div className="product-description-tab__additional-info">
                      {followers != undefined &&
                        followers.map((follower) => {
                          return (
                            // <div class="container mt-5 d-flex justify-content-left">
                            <Row md={12} className="follower-box">
                              <div className="p-3">
                                <div className="d-flex align-items-center">
                                  <div className="image">
                                    {follower?.profilePic == null && (
                                      <img
                                        src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                        className="rounded"
                                        width="100"
                                      />
                                    )}
                                    {follower?.profilePic != null && (
                                      <Image
                                        className="rounded"
                                        width="100"
                                        src={follower?.profilePic}
                                        thumbnail
                                      />
                                    )}{' '}
                                  </div>
                                  <div className="ml-3 w-100">
                                    <h4 className="mb-0 mt-0">
                                      {follower.name}
                                    </h4>{' '}
                                    {/* { !getRole(follower) && (<div class="button mt-2 d-flex flex-row align-items-center">
                                    <button className="btn btn-sm btn-fill-out">
                                      View Profile
                                    </button>
                                  </div>)} */}
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
                                </div>
                              </div>
                            </Row>
                            // </div>
                          );
                        })}
                    </div>
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="Following">
                  <br></br>
                  <div
                    style={{
                      overflowY: 'auto',
                      // border:'1px solid red',
                      // width:'500px',
                      overflowX: 'hidden',
                      height: '40vh',
                      position: 'relative',
                    }}
                  >
                    <div className="product-description-tab__additional-info">
                      {following != undefined &&
                        following.map((following) => {
                          return (
                            <div>
                              <Row md={12} className="follower-box">
                                <div className="p-3">
                                  <div className="d-flex align-items-center">
                                    <div className="image">
                                      {' '}
                                      {/* <img
                                      src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                                      class="rounded"
                                      width="100"
                                    /> */}
                                      {following?.profilePic == null && (
                                        <img
                                          src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                          className="rounded"
                                          width="100"
                                        />
                                      )}
                                      {following?.profilePic != null && (
                                        <Image
                                          className="rounded"
                                          width="100"
                                          src={following?.profilePic}
                                          thumbnail
                                        />
                                      )}{' '}
                                    </div>
                                    <div className="ml-3 w-100">
                                      <h4 className="mb-0 mt-0">
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
                                        </Link>
                                      </h4>{' '}
                                      <span>{following.description}</span>
                                    </div>
                                  </div>
                                </div>
                              </Row>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PartnerProfile;
