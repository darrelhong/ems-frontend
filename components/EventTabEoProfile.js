import { Container, Row, Col } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import EventEoProfileSliderTen from './ProductSlider/EventEoProfileSliderTen';

const EventTabOne = ({ current, upcoming, past }) => {
  if (current !== undefined && upcoming !== undefined && past !== undefined) {
    return (
      <div className="product-tab-area space-pb--r70">
        <Container>
          <Tab.Container defaultActiveKey="current">
            <Nav
              variant="pills"
              className="product-tab-navigation text-center space-mb--30"
            >
              <Nav.Item>
                <Nav.Link eventKey="current">Current</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="upcoming">Upcoming</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="past">Past</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="current">
                <Row>
                  <Col md={12}>
                    <EventEoProfileSliderTen events={current} />
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="upcoming">
                <Row>
                  <Col md={12}>
                    <EventEoProfileSliderTen events={upcoming} />
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="past">
                <Row>
                  <Col md={12}>
                    <EventEoProfileSliderTen events={past} />
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

export default EventTabOne;
