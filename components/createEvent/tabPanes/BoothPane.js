import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const BoothPane = ({ register, errors }) => {
  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Booth Details</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <Row>
            <Col className="form-group" md={12}>
              <label>
                Booth Capacity - How many at your event?
                <span className="required">*</span>
              </label>
              <input
                className="form-control"
                name="boothCapacity"
                type="number"
                ref={register({ required: true })}
              />
              {errors.boothCapacity && (
                <span role="alert" style={{ color: 'red' }}>
                  This field is required
                </span>
              )}
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

BoothPane.propTypes = {
  register: PropTypes.func,
};

export default BoothPane;
