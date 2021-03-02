import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const TicketingPane = ({ wantsTickets, setWantsTickets, register, watch, eventData, setValue, errors }) => {

  useEffect(() => {
    const {
      ticketPrice,
      ticketCapacity,
      saleStartDate,
      salesEndDate,
    } = eventData;
    setValue('ticketPrice', ticketPrice);
    setValue('ticketCapacity', ticketCapacity);
    setValue('saleStartDate', saleStartDate);
    setValue('salesEndDate', salesEndDate);
  }, [wantsTickets]);

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
              <input
                type="checkbox"
                id="wantsTickets"
                name="wantsTickets"
                value={wantsTickets}
                checked={wantsTickets}
                onChange={() => {
                  console.log(!wantsTickets);
                  setWantsTickets(!wantsTickets);
                }}
                style={{ marginRight: 5 }}
              />
              <label htmlFor="wantsTickets">
                {' '}
                Are you selling tickets for your event?
              </label>
            </Col>
            <div>
              <Col className="form-group" md={12}>
                <label>Ticket Price (SGD)
                  {wantsTickets && (<span className="required">*</span>)}
                </label>
                <input
                  className="form-control"
                  name="ticketPrice"
                  type="number"
                  step="0.1"
                  disabled={!wantsTickets}
                  // ref={register()}
                  ref={register({ required: wantsTickets })}
                />
                {errors.ticketPrice && wantsTickets && (
                  <span role="alert" style={{ color: 'red' }}>
                    This field is required
                  </span>
                )
                }
              </Col>
              <Col className="form-group" md={12}>
                <label>
                  Ticket Capacity - How many tickets do you want to sell?
                  {wantsTickets && (<span className="required">*</span>)}
                </label>
                <input
                  className="form-control"
                  name="ticketCapacity"
                  type="number"
                  disabled={!wantsTickets}
                  ref={register({ required: wantsTickets })}
                // ref={register()}
                />
                {errors.ticketCapacity && wantsTickets && (
                  <span role="alert" style={{ color: 'red' }}>
                    This field is required
                  </span>
                )
                }
              </Col>
              <Col className="form-group" md={12}>
                <label>Ticket Sales Start Date
                {wantsTickets && (<span className="required">*</span>)}
                </label>
                <input
                  className="form-control"
                  name="saleStartDate"
                  type="datetime-local"
                  disabled={!wantsTickets}
                  ref={register({ required: wantsTickets })}
                // ref={register()}
                />
                {errors.saleStartDate && wantsTickets && (
                  <span role="alert" style={{ color: 'red' }}>
                    This field is required
                  </span>
                )
                }
              </Col>

              <Col className="form-group" md={12}>
                <label>Ticket Sales End Date
                {wantsTickets && (<span className="required">*</span>)}
                </label>
                <input
                  className="form-control"
                  name="salesEndDate"
                  type="datetime-local"
                  disabled={!wantsTickets}
                  ref={register({ required: wantsTickets })}
                // ref={register()}
                />
                {errors.salesEndDate && wantsTickets && (
                  <span role="alert" style={{ color: 'red' }}>
                    This field is required
                  </span>
                )
                }
                {renderDateError()}
              </Col>
            </div>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

TicketingPane.propTypes = {
  register: PropTypes.func,
  watch: PropTypes.func,
  eventData: PropTypes.object,
  setValue: PropTypes.func,
};

export default TicketingPane;
