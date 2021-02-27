import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const TicketingPane = ({ register, watch }) => {
  const [wantsTickets, setWantsTickets] = useState(false);

  const renderDateError = () => {
    if (
      watch('saleStartDate') &&
      watch('salesEndDate') &&
      watch('salesEndDate') < watch('saleStartDate')
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
        <h3>Ticketing Details</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <Row>
            <Col className="form-group" md={12}>
              <input type="checkbox" id="wantsTickets" name="wantsTickets" value={wantsTickets} checked = {wantsTickets} onChange={() => {
                console.log(!wantsTickets);
                setWantsTickets(!wantsTickets);
              }} />
              <label for="wantsTickets">  Are you selling tickets for your event?</label>
            </Col>
            {wantsTickets && (
              <div>
                <Col className="form-group" md={12}>
                  <label>Ticket Price (SGD)</label>
                  <input
                    className="form-control"
                    name="ticketPrice"
                    type="number"
                    step="0.1"
                    ref={register()}
                  />
                </Col>
                <Col className="form-group" md={12}>
                  <label>
                    Ticket Capacity - How many tickets do you want to sell?
 </label>
                  <input
                    className="form-control"
                    name="ticketCapacity"
                    type="number"
                    ref={register()}
                  />
                </Col>
                <Col className="form-group" md={12}>
                  <label>Ticket Sales Start Date</label>
                  <input
                    className="form-control"
                    name="saleStartDate"
                    type="datetime-local"
                    ref={register()}
                  />
                </Col>

                <Col className="form-group" md={12}>
                  <label>Ticket Sales End Date</label>
                  <input
                    className="form-control"
                    name="salesEndDate"
                    type="datetime-local"
                    ref={register()}
                  />
                  {renderDateError()}
                </Col>
              </div>
            )}



          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

TicketingPane.propTypes = {
  register: PropTypes.func,
  watch: PropTypes.func,
};

export default TicketingPane;
