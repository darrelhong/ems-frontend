import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const OnlinePhysicalPane = ({ register }) => {
  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Online / Physical</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <form method="post" name="enq">
            <Row>
              <Col className="form-group" md={12}>
                <label>Ticket Price</label>
                <input
                  className="form-control"
                  name="ticketPrice"
                  type="number"
                  step="0.1"
                  ref={register()}
                />
              </Col>
              <Col className="form-group" md={12}>
                <label>Ticket Capacity</label>
                <input
                  className="form-control"
                  name="ticketCapacity"
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

OnlinePhysicalPane.propTypes = {
  register: PropTypes.func,
  getValues: PropTypes.func,
};

export default OnlinePhysicalPane;
