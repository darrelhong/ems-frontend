import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const EventDetailsPane = ({ register, handleSubmit, onSubmit, watch }) => {
  const renderDateError = () => {
    if (
      watch('startDate') &&
      watch('endDate') &&
      watch('endDate') < watch('startDate')
    ) {
      return (
        <span style={{ color: 'red' }}>
          End date must be the same as or after start date!
        </span>
      );
    }
  };

  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Event Details</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className="form-group" md={12}>
                <label>
                  Event Name <span className="required">*</span>
                </label>
                <input
                  required
                  className="form-control"
                  name="name"
                  type="text"
                  ref={register()}
                />
              </Col>
              <Col className="form-group" md={12}>
                <label>
                  Event Description <span className="required">*</span>
                </label>
                <textarea
                  required
                  className="form-control"
                  name="descriptions"
                  maxLength="5" //can consider playing with this if needed
                  ref={register()}
                />
              </Col>
              {/* probably need some caption saying either online or physical would do, or shift to online/physical */}
              <Col className="form-group" md={12}>
                <label>
                  Address <span className="required">*</span>
                </label>
                <input
                  required
                  className="form-control"
                  name="address"
                  type="text"
                  ref={register()}
                />
              </Col>

              <Col className="form-group" md={12}>
                <label>Event Website (if any)</label>
                <input
                  className="form-control"
                  name="website"
                  type="text"
                  ref={register()}
                />
              </Col>

              <Col className="form-group" md={12}>
                <label>Start Date</label>
                <input
                  className="form-control"
                  name="startDate"
                  type="date"
                  ref={register()}
                />
              </Col>

              <Col className="form-group" md={12}>
                <label>End Date</label>
                <input
                  className="form-control"
                  name="endDate"
                  type="date"
                  ref={register()}
                />
                {renderDateError()}
              </Col>
              <Col md={12}>
                <button
                  type="submit"
                  className="btn btn-fill-out"
                  name="submit"
                  value="Submit"
                >
                  Save
                </button>
              </Col>
            </Row>
          </form>
        </div>
      </Card.Body>
    </Card>
  );
};

EventDetailsPane.propTypes = {
  register: PropTypes.func,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  watch: PropTypes.func,
  //onSubmit shouldnt be here actually will shift it out soon
};

export default EventDetailsPane;
