import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const BoothPane = ({ register }) => {
  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Booth Details</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <form method="post" name="enq">
            <Row>
              <Col className="form-group" md={12}>
                <label>Booth Capacity - How many at your event?</label>
                <input
                  className="form-control"
                  name="boothCapacity"
                  type="number"
                  ref={register()}
                />
              </Col>
            </Row>
          </form>
        </div>
      </Card.Body>
    </Card>
  );
};

BoothPane.propTypes = {
  register: PropTypes.func,
};

export default BoothPane;
