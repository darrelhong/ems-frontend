import Link from 'next/link';
import { LayoutOne } from '../../layouts';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductRating } from '../../components/Product';
import EventsProfile from '../../components/ProductTab/EventsProfile';
import PartnerWrapper from '../../components/wrapper/PartnerWrapper';
import useUser from '../../lib/query/useUser';
import { useState, useEffect } from 'react';
//import {
//IoIosList,
//IoIosClipboard,
//IoIosDownload,
//IoIosCash,
//IoIosCreate,
//IoIosPerson,
//} from "react-icons/io";

import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import getEvents from '../../lib/query/getEvents';
import getFollowers from '../../lib/query/getFollowers';
import getFollowing from '../../lib/query/getFollowing';
import { BsPencilSquare } from 'react-icons/bs';


import { FaHtml5 } from 'react-icons/fa';

const PartnerProfile = ({ router: { query } }) => {
  const { data: user } = useUser(localStorage.getItem('userId'));
  const localuser = JSON.parse(query.localuser);
  // if user = BP , and view his own profile, there should be an edit button and should have no follow button

  const { data: partner } = useUser(localuser);

  const { data: events } = getEvents(localuser);

  const { data: followers } = getFollowers(localuser);

  const { data: following } = getFollowing(localuser);

  const [publicView, setPublicView] = useState();


  useEffect(() => {
    if (user?.id !== localuser) {
      setPublicView(true);
    } else {
      setPublicView(false);
    }
  });

  const getRole = (userRole) => {
    var checkAttendee = false;
    userRole.roles.forEach(role => {
      console.log(role);
      if (role.description === "Attendee") {
        checkAttendee = true;
      }


    })
    return checkAttendee
  }



  return (
    <PartnerWrapper>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle="Business Partner Profile Details">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">
            Business Partner Profile Details
          </li>
        </ol>
      </BreadcrumbOne>

      <div className="my-account-content space-pt--r100 space-pb--r100">
        <div>
          <Container>
            <Row>
              <Col xs={6} md={4}>
                <div>
                {partner?.profilePic == null && (<Image
                  src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                  className="profile-image"
                  thumbnail
                />)}
                {partner?.profilePic != null && (
                  <Image
                    className="profile-image"
                    src={partner?.profilePic}
                    thumbnail
                  />
                )}
                </div>
              </Col>
              <Col xs={6} md={4}>
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

                <div style={{ display: !publicView ? 'block' : 'none' }}>
                  &nbsp;
                  <Link href="/partner/profile-account">
                    <button
                      className="btn btn-fill-out"
                      name="edit"
                      value="edit"
                    >
                      <BsPencilSquare />
                    </button>
                  </Link>
                </div>
                <br></br>
                {publicView && (
                  <button
                    type="submit"
                    className="btn btn-fill-out"
                    name="submit"
                    value="Submit"
                  >
                    Follow
                  </button>
                )}
              </Col>
            </Row>
          </Container>
        </div>
        <Row className="justify-content-md-center">
          <Col md={{ span: 8 }}>
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
                  <div className="product-description-tab__details">
                  
                    <EventsProfile
                      current={events}
                    //   upcoming="bestSellerProducts"
                    //  past="featuredProducts"
                    />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="Description">
                  <br></br>
                  <div className="product-description-tab__additional-info">
                    {partner?.description === null && "There is no description." || partner?.description}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="Followers">
                  <br></br>
                  <div className="product-description-tab__additional-info">
                    {followers != undefined &&
                      followers.map((follower) => {
                        
                        return (
                          // <div class="container mt-5 d-flex justify-content-left">
                          <Row md={12} className="follower-box">
                            <div class="p-3">
                              <div class="d-flex align-items-center">
                                <div class="image">
                                
                                  {follower?.profilePic == null && (<img
                                    src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                    class="rounded"
                                    width="100"
                                  />)}
                                  {follower?.profilePic != null && (<Image
                                    class="rounded"
                                    width="100"
                                    src={follower?.profilePic}
                                    thumbnail
                                  />)}

                                  {' '}
                                </div>
                                <div class="ml-3 w-100">
                                  <h4 class="mb-0 mt-0">{follower.name}</h4>{' '}
                                    {/* { !getRole(follower) && (<div class="button mt-2 d-flex flex-row align-items-center">
                                    <button className="btn btn-sm btn-fill-out">
                                      View Profile
                                    </button>
                                  </div>)} */}

                                  {!follower.categoryPreferences.isEmpty && follower.categoryPreferences.map((eventtype)=>{return( <span>
                        {' '}
                        <Badge variant="primary">
                          {eventtype}
                        </Badge>{' '}
                      </span>)})}
                                    

                                
                                </div>
                              </div>
                            </div>
                          </Row>
                          // </div>
                        );
                      })}
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="Following">
                  <br></br>
                  <div className="product-description-tab__additional-info">
                    {following != undefined &&
                      following.map((following) => {
                        return (
                          <div>
                            <Row md={12} className="follower-box">
                              <div class="p-3">
                                <div class="d-flex align-items-center">
                                  <div class="image">
                                    {' '}
                                    {/* <img
                                      src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                                      class="rounded"
                                      width="100"
                                    /> */}
                                    {following?.profilePic == null && (<img
                                      src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                      class="rounded"
                                      width="100"
                                    />)}
                                    {following?.profilePic != null && (
                                      <Image
                                        class="rounded"
                                        width="100"
                                        src={following?.profilePic}
                                        thumbnail
                                      />)}
                                    {' '}
                                  </div>
                                  <div class="ml-3 w-100">
                                   
                                    <h4 class="mb-0 mt-0">
                                      <Link href={{
                                        pathname: "/organiser/profile-public",
                                        query: { paraId: JSON.stringify(following?.id) }
                                      }}>
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
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </div>
    </PartnerWrapper>
  );
};

export default withRouter(PartnerProfile);
