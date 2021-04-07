import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const TicketingPane = ({
  freeTickets,
  setFreeTickets,
  sellingTicket,
  setsellingTicket,
  formState,
  getValues,
  register,
  watch,
  eventData,
  setValue,
  errors,
}) => {
  useEffect(() => {
    const {
      ticketPrice,
      ticketCapacity,
      saleStartDate,
      salesEndDate,
    } = eventData;
    if (sellingTicket) {
      setValue('ticketPrice', ticketPrice);
      setValue('ticketCapacity', ticketCapacity);
      setValue('saleStartDate', saleStartDate);
      setValue('salesEndDate', salesEndDate);
    } else {
      setValue('ticketPrice', null);
      setValue('ticketCapacity', null);
      setValue('saleStartDate', null);
      setValue('salesEndDate', null);
    }
  }, [sellingTicket]);

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
                id="sellingTicket"
                name="sellingTicket"
                value={sellingTicket}
                checked={sellingTicket}
                ref={register()}
                onChange={() => {
                  console.log(!sellingTicket);
                  //if go from sell to dont sell then make it false
                  // if (sellingTicket) {
                  //   setFreeTickets(false);
                  //   // setValue("ticketPrice", 16);
                  // }
                  setsellingTicket(!sellingTicket);
                }}
                style={{ marginRight: 5 }}
              />
              <label htmlFor="sellingTicket">
                {' '}
                Are you selling tickets for your event?
              </label>
            </Col>
            {/* 
            <Col className="form-group" md={12}>
              <input
                type="checkbox"
                id="freeTickets"
                name="freeTickets"
                value={freeTickets}
                checked={freeTickets}
                onChange={() => {
                  console.log(!freeTickets);
                  setFreeTickets(!freeTickets);
                }}
                style={{ marginRight: 5 }}
              />
              <label htmlFor="freeTickets">
                {' '}
                Are your tickets free?
              </label>
            </Col> */}

          
              <Col className="form-group" md={12}>
                <label>
                  Ticket Price (SGD)
                  {sellingTicket && <span className="required">*</span>}
                </label>
                <input
                  className="form-control"
                  name="ticketPrice"
                  type="number"
                  step="0.1"
                  disabled={!sellingTicket}
                  // disabled={!sellingTicket || freeTickets}
                  ref={register({ required: sellingTicket })}
                />
                {/* {(watch('ticketPrice') == 0 && formState.touched?.ticketPrice) && (
                  <span role="alert" style={{ color: 'blue' }}>
                    Are you sure you are selling for $0?
                  </span>
                )
                } */}
                {errors.ticketPrice && (
                  // {errors.ticketPrice && sellingTicket && !freeTickets && (
                  <span role="alert" style={{ color: 'red' }}>
                    This field is required
                  </span>
                )}
              </Col>
              <Col className="form-group" md={12}>
                <label>
                  Ticket Capacity - How many tickets do you want to sell?
                  {sellingTicket && <span className="required">*</span>}
                </label>
                <input
                  className="form-control"
                  name="ticketCapacity"
                  type="number"
                  disabled={!sellingTicket}
                  ref={register({ required: sellingTicket, min: 1 })}
                  // ref={register()}
                />
                {errors.ticketCapacity && sellingTicket && (
                  <span role="alert" style={{ color: 'red' }}>
                    At least 1 ticket if you are selling!
                  </span>
                )}
              </Col>
              <Col className="form-group" md={12}>
                <label>
                  Ticket Sales Start Date
                  {sellingTicket && <span className="required">*</span>}
                </label>
                <input
                  className="form-control"
                  name="saleStartDate"
                  type="datetime-local"
                  disabled={!sellingTicket}
                  ref={register({ required: sellingTicket })}
                  // ref={register()}
                />
                {errors.saleStartDate && sellingTicket && (
                  <span role="alert" style={{ color: 'red' }}>
                    This field is required
                  </span>
                )}
              </Col>

              <Col className="form-group" md={12}>
                <label>
                  Ticket Sales End Date
                  {sellingTicket && <span className="required">*</span>}
                </label>
                <input
                  className="form-control"
                  name="salesEndDate"
                  type="datetime-local"
                  disabled={!sellingTicket}
                  // ref={register({ required: sellingTicket })}
                  // ref={register({ required: sellingTicket })}
                  ref={register({ required: sellingTicket, validate: value => !sellingTicket || value > watch('saleStartDate') })}
                  // ref={register()}
                />
                {errors.salesEndDate && sellingTicket && (
                  <span role="alert" style={{ color: 'red' }}>
                    This field is required, end date must also be later than
                    start date!
                  </span>
                )}
              </Col>
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
