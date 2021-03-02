import { Container, Row, Col } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { ProductSliderTen } from "../ProductSlider";

const EventsProfile = ({
  title,
  current,
  // upcoming,
  // past,
}) => {
  return (
    <div className="product-tab-area space-pb--r70">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="section-title text-center space-mb--25">
              <h2>{title}</h2>
            </div>
          </Col>
        </Row>

        <Tab.Container defaultActiveKey="current">
          <Nav
            variant="pills"
            className="product-tab-navigation text-center justify-content-center space-mb--30"
          >
            <Nav.Item>
              <Nav.Link eventKey="current">Current</Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link eventKey="upcoming">Upcoming</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="past">Past</Nav.Link>
            </Nav.Item> */}
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="current">
              <Row>
                <Col md={12}>
                  <ProductSliderTen products={current} />
                </Col>
              </Row>
            </Tab.Pane>
            {/* <Tab.Pane eventKey="upcoming">
              <Row>
                <Col md={12}>
                  <ProductSliderTen products={bestSellerProducts} />
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="past">
              <Row>
                <Col md={12}>
                  <ProductSliderTen products={featuredProducts} />
                </Col>
              </Row>
            </Tab.Pane> */}
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default EventsProfile;
