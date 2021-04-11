import { Container, Row, Col } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import EventBpProfileSliderTen from './ProductSlider/EventBpProfileSlider';
import { useEffect, useState } from 'react';

const EventTabOne = ({ current,  past }) => {
  const [showNoCurrentMsg, setShowNoCurrentMsg] = useState(false);
  const [showNoPastMsg, setShowNoPastMsg] = useState(false);

  useEffect(() => {
    if (current != null) {
      setShowNoCurrentMsg(current.length == 0);
    }
    if (past != null) {
      setShowNoPastMsg(past.length == 0);
    }
  })

  if (current !== undefined && past !== undefined) {
    return (
      <div className="product-tab-area space-pb--r70">
        <Container>
          <Tab.Container defaultActiveKey="current">
            <Nav
              variant="pills"
              className="product-tab-navigation text-center justify-content-center space-mb--30"
            >
              <Nav.Item>
                <Nav.Link eventKey="current">Current</Nav.Link>
              </Nav.Item>
             
              <Nav.Item>
                <Nav.Link eventKey="past">Past</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="current">
                <Row>
                  <Col md={12}>
                    <EventBpProfileSliderTen events={current} />
                  </Col>
                </Row>
                {showNoCurrentMsg && (
                  <div className="w-100 text-center" style={{marginTop: "100px"}}>There are no current events.</div>
                )}
              </Tab.Pane>
             
              <Tab.Pane eventKey="past">
                <Row>
                  <Col md={12}>
                    <EventBpProfileSliderTen events={past} />
                  </Col>
                </Row>
                {showNoPastMsg && (
                  <div className="w-100 text-center" style={{marginTop: "100px"}}>There are no past events.</div>
                )}
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

export default EventTabOne;
