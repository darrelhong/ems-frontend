import { Container, Row, Col } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';
import {
  Button,
} from "reactstrap";
// import EventEoProfileSliderTen from './ProductSlider/EventEoProfileSliderTen';

const FollowersTabEoProfile = ({ attendees, partners, showPublicView }) => {
  if (attendees !== undefined && partners !== undefined) {
    return (
      <div className="product-tab-area space-pb--r70">
        <Container>
          <Tab.Container defaultActiveKey="attendees">
            <Nav
              variant="pills"
              className="product-tab-navigation text-center justify-content-center space-mb--30"
            >
              <Nav.Item>
                <Nav.Link eventKey="attendees">Attendee</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="partners">Partner</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="attendees">
                <Row>
                  <Col md={12}>
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
                        {attendees != null && attendees.map((attendee) => {
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
                                    {attendee?.profilePic == null && (
                                      <img
                                        src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                        className="img-circle img-no-padding img-responsive"
                                      />
                                    )}
                                    {attendee?.profilePic != null && (
                                      <Image
                                        className="img-circle img-no-padding img-responsive"
                                        src={attendee?.profilePic}
                                      />
                                    )}
                                  </div>
                                </Col>
                                <Col md="6" xs="6">
                                  {/* <br></br> */}
                                  {attendee.name} <br />
                                  <span className="text-muted">
                                    {attendee.email}
                                  </span>
                                  <div>
                                    {!attendee.categoryPreferences.isEmpty &&
                                      attendee.categoryPreferences.map(
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
                                  {!showPublicView && (<Button
                                    className="btn-round btn-icon"
                                    color="success"
                                    outline
                                    size="sm"
                                  >
                                    Select
                                    {/* <i className="fa fa-envelope" /> */}
                                  </Button>)}
                                </Col>
                              </Row>
                            </li>
                          );
                        })}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="partners">
                <Row>
                  <Col md={12}>
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
                        <ul className="list-unstyled team-members">
                          {partners != null &&
                            partners.map((partner) => {
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
                                        {partner?.profilePic == null && (
                                          <img
                                            src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                            className="img-circle img-no-padding img-responsive"
                                          />
                                        )}
                                        {partner?.profilePic != null && (
                                          <Image
                                            className="img-circle img-no-padding img-responsive"
                                            src={partner?.profilePic}
                                          />
                                        )}
                                      </div>
                                    </Col>
                                    <Col md="6" xs="6">
                                      {/* <br></br> */}
                                      <Link
                                        href={{
                                          pathname:
                                            '/partner/partner-profile',
                                          query: {
                                            paraId: JSON.stringify(
                                              partner?.id
                                            ),
                                          },
                                        }}
                                      >
                                        {partner.name}
                                      </Link> <br /> 
                                      <span className="text-muted">
                                        {partner.email}
                                      </span>
                                      <div>
                                        {partner.businessCategory !== null &&
                                          (
                                            <span>
                                              {' '}
                                              <Badge variant="primary">
                                                {partner.businessCategory}
                                              </Badge>{' '}
                                            </span>


                                          )}
                                      </div>
                                    </Col>
                                    <Col className="text-right" md="1" xs="1">
                                      <br></br>
                                      {!showPublicView && (<Button
                                        className="btn-round btn-icon"
                                        color="success"
                                        outline
                                        size="sm"
                                      >
                                        Select
                                        {/* <i className="fa fa-envelope" /> */}
                                      </Button>)}
                                    </Col>
                                  </Row>
                                </li>
                              )
                            })}
                        </ul>

                      </div>
                    </div>
                  </Col>
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default FollowersTabEoProfile;
