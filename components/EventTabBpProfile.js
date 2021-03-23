import { Container, Row, Col } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import EventBpProfileSliderTen from './ProductSlider/EventBpProfileSlider';

const EventTabOne = ({ current,  past }) => {
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
              </Tab.Pane>
             
              <Tab.Pane eventKey="past">
                <Row>
                  <Col md={12}>
                    <EventBpProfileSliderTen events={past} />
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
