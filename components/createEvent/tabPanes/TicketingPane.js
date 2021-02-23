import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const TicketingPane = () => {
  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Event Details</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <form method="post" name="enq">
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
                />
              </Col>
              <Col className="form-group" md={12}>
                <label>
                  Event Description <span className="required">*</span>
                </label>
                <textarea
                  required
                  className="form-control"
                  name="description"
                  maxLength="5" //can consider playing with this if needed
                />
              </Col>
              <Col className="form-group" md={12}>
                <label>
                  Email Address <span className="required">*</span>
                </label>
                <input
                  required
                  className="form-control"
                  name="email"
                  type="email"
                />
              </Col>
              <Col className="form-group" md={12}>
                <label>
                  Current Password <span className="required">*</span>
                </label>
                <input
                  required
                  className="form-control"
                  name="password"
                  type="password"
                />
              </Col>
              <Col className="form-group" md={12}>
                <label>
                  New Password <span className="required">*</span>
                </label>
                <input
                  required
                  className="form-control"
                  name="npassword"
                  type="password"
                />
              </Col>
              <Col className="form-group" md={12}>
                <label>
                  Confirm Password <span className="required">*</span>
                </label>
                <input
                  required
                  className="form-control"
                  name="cpassword"
                  type="password"
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

export default TicketingPane;
