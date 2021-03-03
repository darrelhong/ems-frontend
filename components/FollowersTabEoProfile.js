import { Container, Row, Col } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';
// import EventEoProfileSliderTen from './ProductSlider/EventEoProfileSliderTen';

const FollowersTabEoProfile = ({ attendees, partners }) => {
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
                  {attendees.map((attendee) => {
                        return (
                          <div  >
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
                                    {attendee?.profilePic == null && (<img
                                      src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                      class="rounded"
                                      width="100"
                                    />)}
                                    {attendee?.profilePic != null && (
                                      <Image
                                        class="rounded"
                                        width="100"
                                        src={attendee?.profilePic}
                                        thumbnail
                                      />)}
                                    {' '}
                                  </div>
                                  <div class="ml-3 w-100">
                                   
                                    <h4 class="mb-0 mt-0">
                   
                                        {attendee.name}
                                    </h4>{' '}
                                    {!attendee.categoryPreferences.isEmpty && attendee.categoryPreferences.map((eventtype)=>{return( <span>
                        {' '}
                        <Badge variant="primary">
                          {eventtype}
                        </Badge>{' '}
                      </span>)})}
                                  </div>
                                </div>
                              </div>
                            </Row>
                          </div>
                        );
                      })}
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="partners">
                <Row>
                  <Col md={12}>
                  {partners.map((partner) => {
                        return (
                          <div  >
                            <Row md={12} className="follower-box">
                            
                              <div class="p-3" >
                                <div class="d-flex align-items-center">
                                  <div class="image">
                                    {' '}
                                    {/* <img
                                      src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                                      class="rounded"
                                      width="100"
                                    /> */}
                                    {partner.profilePic == null && (<img
                                      src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                      class="rounded"
                                      width="100"
                                    />)}
                                    {partner.profilePic != null && (
                                      <Image
                                        class="rounded"
                                        width="100"
                                        src={partner.profilePic}
                                        thumbnail
                                      />)}
                                    {' '}
                                  </div>
                                  
                                  <div class="ml-3 w-100">
                                   
                                    <h4 class="mb-0 mt-0">
                                    <Link href={{
                                        pathname: "/partner/partner-profile",
                                        query: { localuser: JSON.stringify(partner.id) }
                                      }}>
                                        {partner.name} 
                                       
                                      </Link>
                                       
                                    </h4>{' '} 
                                    {/* <span>{partner.description} </span> */}
                                    {(partner.businessCategory != null ) && ( <span>
                        {' '}
                        <Badge variant="primary">
                          {partner.businessCategory}
                        </Badge>{' '}
                      </span>)}
                                       
                                  </div>
                                </div>
                              </div>
                            </Row>
                          </div>
                        );
                      })}
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
