import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
// import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';

// const token = Cookies.get('token');

const EventDetailsPane = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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

export default EventDetailsPane;
