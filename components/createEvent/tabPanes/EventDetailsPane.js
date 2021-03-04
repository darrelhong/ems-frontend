import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const EventDetailsPane = ({ register, watch, errors }) => {
  // const renderDateError = () => {
  //   if (
  //     watch('eventStartDate') &&
  //     watch('eventEndDate') &&
  //     watch('eventEndDate') < watch('eventStartDate')
  //   ) {
  //     return (
  //       <span style={{ color: 'red' }}>
  //         End date must be the same as or after start date!
  //       </span>
  //     );
  //   }
  // };

  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Event Details</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <Row>
            <Col className="form-group" md={12}>
              <label>
                Event Name <span className="required">*</span>
              </label>
              <input
                // required
                className="form-control"
                name="name"
                type="text"
                ref={register({ required: true })}
                // ref={register({ required: true })}
              />
              {errors.name && (
                <span role="alert" style={{ color: 'red' }}>
                  This field is required
                </span>
              )}
            </Col>
            <Col className="form-group" md={12}>
              <label>
                Event Description <span className="required">*</span>
              </label>
              <textarea
                // required
                className="form-control"
                name="descriptions"
                maxLength="200" //can consider playing with this if needed
                ref={register({ required: true })}
                // ref={register({ required: true })}
              />
              {errors.descriptions && (
                <span role="alert" style={{ color: 'red' }}>
                  This field is required
                </span>
              )}
            </Col>
            <Col className="form-group" md={12}>
              <label>
                Start Date<span className="required">*</span>
              </label>
              <input
                className="form-control"
                name="eventStartDate"
                type="datetime-local"
                ref={register({ required: true })}
              />
              {errors.eventStartDate && (
                <span role="alert" style={{ color: 'red' }}>
                  This field is required
                </span>
              )}
            </Col>

            <Col className="form-group" md={12}>
              <label>
                End Date<span className="required">*</span>
              </label>
              <input
                className="form-control"
                name="eventEndDate"
                type="datetime-local"
                // ref={register({required : true})}
                ref={register({
                  required: true,
                  validate: (value) => value > watch('eventStartDate'),
                })}
              />
              {errors.eventEndDate && (
                <span role="alert" style={{ color: 'red' }}>
                  This field is required, end date must also be later than start
                  date!
                </span>
              )}
              {/* {renderDateError()} */}
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

EventDetailsPane.propTypes = {
  register: PropTypes.func,
  watch: PropTypes.func,
  //onSubmit shouldnt be here actually will shift it out soon
};

export default EventDetailsPane;