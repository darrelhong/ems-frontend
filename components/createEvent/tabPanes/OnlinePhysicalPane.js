import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const OnlinePhysicalPane = ({ register, watch }) => {
  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Online / Physical</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <Row>
            <Col className="form-group" md={12}>
              <label>
                <input
                  className="form-control"
                  name="physical"
                  type="radio"
                  ref={register()}
                  value={true}
                  style={{ width: '1em' }}
                />
                Physical
              </label>
              <label>
                <input
                  className="form-control"
                  name="physical"
                  type="radio"
                  ref={register()}
                  value={false}
                  style={{ width: '1em' }}
                />
                Online
              </label>
            </Col>
            {watch('isPhysical') ? (
              <h1>{watch('isPhysical')}</h1>
            ) : (
              <h1>{watch('isPhysical')}</h1>
            )}
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

OnlinePhysicalPane.propTypes = {
  register: PropTypes.func,
  watch: PropTypes.func,
};

export default OnlinePhysicalPane;
