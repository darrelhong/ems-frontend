import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from 'react-query';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';

import { useEvent } from 'lib/query/events';
import { formatter } from 'lib/util/currency';
import api from 'lib/ApiClient';
import useUser from 'lib/query/useUser';

import PartnerWrapper from 'components/wrapper/PartnerWrapper';
// import AttendeeWrapper from 'components/wrapper/AttendeeWrapper';
import CenterSpinner from 'components/custom/CenterSpinner';
import { BreadcrumbOne } from 'components/Breadcrumb';
import ButtonWithLoading from 'components/custom/ButtonWithLoading';
import BpPaymentView from 'components/custom/ticketing/BpPaymentView';
import { getBoothTotalFromEvent } from 'lib/functions/boothFunctions';
import { useForm } from 'react-hook-form';

export function getServerSideProps({ query }) {
  return {
    props: { ...query },
  };
}
const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
export default function PartnerEventTicketing({ id }) {
  const { data, status } = useEvent(id);
  const { data: attendee } = useUser(localStorage.getItem('userId'));
  const { data: partner } = useUser(localStorage.getItem('userId'));

  const [boothQty, setboothQty] = useState(1);
  const [view, setView] = useState('summary');

  const [clientSecret, setClientSecret] = useState('');
  const [checkoutResponse, setCheckoutResponse] = useState();
  const [paymentCompleteResp, setPaymentCompleteResp] = useState();
  
  const [boothTotal, setBoothTotal] = useState(0);
  const maxBoothAllowable = data?.boothCapacity - boothTotal;
  const {
    register,
    handleSubmit,
    errors,
    getValues,
} = useForm();

  useEffect(()=> {
    const loadBoothTotal = async () => {
        const total = await getBoothTotalFromEvent(id);
        setBoothTotal(total);
    }
    loadBoothTotal();
  },[]);

  // const { mutate: checkout, isError, isLoading } = useMutation(
  //   (data) => api.post('/api/ticketing/checkout', data),
  //   {
  //     onSuccess: (resp) => {
  //       setCheckoutResponse(resp.data);
  //       setClientSecret(resp.data.clientSecret);
  //       setView('payment');
  //     },
  //   }
  // );

  const { mutate: checkout, isError, isLoading } = useMutation(
    (data) => api.post('/api/sellerProfile/checkout', data),
    {
      onSuccess: (resp) => {
        setCheckoutResponse(resp.data);
        setClientSecret(resp.data.clientSecret);
        setView('payment');
      },
    }
  );

  const onPaymentCompleteResp = (resp) => {
    setPaymentCompleteResp(resp.data);
    // console.log('payment complete, printing response');
    // console.log(resp.data);
    setView('success');
  };

  const onSubmit = (data) => {
    console.log('on submit');
    console.log(data);
    const { boothQty, comments, description } = data;
    //NOW JUST NEED SET UP MY BACKEND METHOD TO DO THIS
    checkout({ eventId: id, boothQty, comments, description });
  }
  return (
    <PartnerWrapper title="Registering for Event">
      {status === 'loading' ? (
        <CenterSpinner />
      ) : status === 'error' ? (
        <Alert variant="danger">An error has occured</Alert>
      ) : (
        <>
          <BreadcrumbOne pageTitle="Event Application">
            <ol className="breadcrumb justify-content-md-end">
              <li className="breadcrumb-item">
                <Link href="/partner/home">
                  <a>Partner Home</a>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/partner/events">
                  <a>Events</a>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href={`/partner/events/${id}`}>
                  <a>{data.name}</a>
                </Link>
              </li>
              <li className="breadcrumb-item active">Application</li>
            </ol>
          </BreadcrumbOne>

          <Container className="my-4">
            <Row className="justify-content-center">
              <Col lg={7}>
                {view == 'summary' ? (
                  <>
                    <Row>
                      <Col>
                        <h3>{data.name}</h3>
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col>
                        <p>
                          Starts on:{' '}
                          {format(
                            parseISO(data.eventStartDate),
                            'eee, dd MMM yy hh:mmbbb'
                          )}
                        </p>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col xs={6} sm={8}>
                        <p className="text-dark">
                          <strong>Description:</strong><span className="required">*</span>
                        </p>
                        {/* <br/> */}
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col>
                        <p>A short description of what you will be offering / selling in the event!</p>
                      </Col>
                    </Row>

                    <Row>
                        <Col>
                    <textarea
                        // required
                        className="form-control"
                        name="description"
                        ref={register({ required: true })}
                        style={{
                            marginBottom:'5%'
                        }}
                    />
                    {errors.description && (
                        <div
                            className="alert alert-danger"
                            role="alert"
                            style={{
                                marginTop: '3%'
                            }}
                        >
                            Please leave a short description
                        </div>
                    )}
                    </Col>
                    </Row>
                    
                    <Row className="mb-4">
                      <Col xs={6} sm={8}>
                        <p className="text-dark">
                          <strong>Booth Price: </strong>
                          {formatter.format(data.boothPrice)}
                        </p>
                      </Col>
                      <Col>
                        <div className="input-group input-group-sm">
                          {/* <select
                            className="custom-select"
                            id="quantity"
                            value={boothQty}
                            onChange={(e) => {
                              setboothQty(e.target.value);
                            }}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                              <option key={i} value={i}>
                                {i}
                              </option>
                            ))}
                          </select> */}
                           <input
                        className="form-control"
                        name="boothQty"
                        type="number"
                        defaultValue={1}
                        min={1}
                        onChange={(e) => setboothQty(e.target.value)}
                        ref={register({
                            validate: (value) => value > 0 && value <= maxBoothAllowable
                        })}
                        // ref={register()}
                    />
                          <div className="input-group-append">
                            <label
                              className="input-group-text"
                              htmlFor="inputGroupSelect02"
                            >
                              Qty
                            </label>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col>
                        <p
                        style={{
                          textAlign:'right'
                        }}>
                            {data.boothCapacity - boothTotal} booths remaining!
                        </p>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                    {errors.boothQuantity && getValues('boothQuantity') > maxBoothAllowable && (
                        <div
                            className="alert alert-danger"
                            role="alert"
                            style={{
                                marginTop: '3%'
                            }}
                        >
                            Maximum of {maxBoothAllowable} allowed!
                        </div>
                    )}
                    </Col>
                    </Row>

                    <Row>
                      <Col xs={6} sm={8}>
                        <p className="text-dark">
                          <strong>Any additional comments?</strong>
                        </p>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col>
                        <p> eg. you would like your booths next to each other (if more than one)</p>
                      </Col>
                    </Row>
                    <Row>
                        <Col>
                        <textarea
                        className="form-control"
                        name="comments"
                        ref={register()}
                        style={{
                            marginBottom: '5%'
                        }}
                    />
                    </Col>
                    </Row>

                    {/* <Row className="mb-5">
                      <Col>
                        <p>
                          Sales end on{' '}
                          {format(
                            parseISO(data.saleStartDate),
                            'eee, dd MMM yy hh:mmbbb'
                          )}
                        </p>
                      </Col>
                    </Row> */}

                    <Row>
                      <Col>
                        <h4>Order summary:</h4>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <p className="text-dark">
                          {boothQty} x Standard booth
                        </p>
                      </Col>
                      <Col className="col-auto">
                        <p className="text-dark">
                          {formatter.format(data.boothPrice * boothQty)}
                        </p>
                      </Col>
                    </Row>
                    <hr></hr>
                    <Row className="mb-4">
                      <Col>
                        <p className="h4 text-body">Total</p>
                      </Col>
                      <Col className="col-auto">
                        <p className="h5 text-body">
                          {formatter.format(data.boothPrice * boothQty)}
                        </p>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        {isError && (
                          <Alert variant="danger" role="alert">
                            An error has occured. Please refresh and try again.
                          </Alert>
                        )}
                        <ButtonWithLoading
                          className="btn btn-fill-out btn-sm"
                          onClick={handleSubmit(onSubmit)}
                          // onClick={() => checkout({ eventId: id, boothQty })}
                          isLoading={isLoading}
                        >
                          Checkout
                        </ButtonWithLoading>
                      </Col>
                    </Row>
                  </>
                ) : view == 'payment' ? (
                  <Elements stripe={promise}>
                    <BpPaymentView
                      clientSecret={clientSecret}
                      attendee={attendee}
                      partner={partner}
                      checkoutResponse={checkoutResponse}
                      onPaymentCompleteResp={onPaymentCompleteResp}
                      event={data}
                    />
                  </Elements>
                ) : view == 'success' ? (
                  <>
                    <Row>
                      <Col>
                        <h3>Order Confirmed</h3>
                        <p>Payment success! Your order has been completed.</p>

                        <h4>Details</h4>
                        <h5>
                          {boothQty} booths{boothQty > 1 ? 's' : null} at{' '}
                          {data.name}
                        </h5>

                        <Row className="mt-3">

                          {paymentCompleteResp && (
                             <Col md={6} key={paymentCompleteResp.id} className="mb-4">
                              <Card bg="light" border="light">
                                <Card.Header>ID: {paymentCompleteResp.id}</Card.Header>
                                <Card.Body>
                                  <Card.Title>{paymentCompleteResp.event.name}</Card.Title>
                                  <Card.Subtitle className="mb-2 text-dark font-weight-normal">
                                    Partner: {paymentCompleteResp.businessPartner.name}
                                  </Card.Subtitle>
                                  <Card.Text>
                                    Application Description: {paymentCompleteResp.description}
                                  </Card.Text>
                                  <Card.Text>
                                    Application Comments: {paymentCompleteResp.comments}
                                  </Card.Text>
                                  <Card.Text>
                                    Payment: {paymentCompleteResp.paymentStatus}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </Col>
                          )}
                          {/* {paymentCompleteResp.map((ticket) => (
                            <Col md={6} key={ticket.id} className="mb-4">
                              <Card bg="light" border="light">
                                <Card.Header>ID: {ticket.id}</Card.Header>
                                <Card.Body>
                                  <Card.Title>{ticket.event.name}</Card.Title>
                                  <Card.Subtitle className="mb-2 text-dark font-weight-normal">
                                    Attendee: {ticket.attendee.name}
                                  </Card.Subtitle>
                                  <Card.Text>
                                    Payment: {ticket.paymentStatus}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))} */}
                        </Row>

                        <br></br>
                        <Link href="/attendee/tickets">
                          <button className="btn btn-fill-out btn-sm">
                            View my tickets
                          </button>
                        </Link>
                      </Col>
                    </Row>
                  </>
                ) : null}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </PartnerWrapper>
  );
}

PartnerEventTicketing.propTypes = {
  id: PropTypes.string,
};


// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { Alert, Col, Container, Row } from 'react-bootstrap';
// import Link from 'next/link';
// import {
//     getEventDetails,
//     updateEvent,
//     deleteEvent,
//     getSellerProfilesFromEvent,
//     returnNewSellerApplications
// } from 'lib/query/eventApi';
// import { useEvent } from 'lib/query/events';
// import { format, parseISO } from 'date-fns';
// import { BreadcrumbOne } from 'components/Breadcrumb';
// import PartnerWrapper from 'components/wrapper/PartnerWrapper';
// import EventImageGallery from 'components/events/partner/EventImageGallery';
// import AddToCalendar from 'components/custom/AddToCalendar';
// import ShareButton from 'components/custom/ShareButton';

// const PartnerEventCheckout = () => {
//     const router = useRouter();
//     const { id } = router.query;
//     const [event, setEvent] = useState(Object);
//     const { data, status } = useEvent(id);
//     // useEffect(() => {
//     //     const loadData = async () => {
//     //         let eventData = await getEventDetails(id);
//     //         setEvent(eventData);
//     //     };
//     //     if (id) loadData();
//     // }, []);

//     return (
//         <PartnerWrapper title={event.name || ' Event Page'} >
//             <BreadcrumbOne pageTitle="Event">
//             <ol className="breadcrumb justify-content-md-end">
//               <li className="breadcrumb-item">
//                 <Link href="/partner/home">
//                   <a>Partner Home</a>
//                 </Link>
//               </li>
//               <li className="breadcrumb-item">
//                 <Link href={`/partner/events/${id}`}>
//                   <a>Events</a>
//                 </Link>
//               </li>
//               <li className="breadcrumb-item">
//                 <Link href="/partner/events/">
//                   <a>{data?.name}</a>
//                 </Link>
//               </li>
//               <li className="breadcrumb-item active">Checkout</li>
//             </ol>
//           </BreadcrumbOne>
//           <Container className="space-pt--r100 space-pb--r100">
//           <Row className="justify-content-center">
//               <Col lg={7}>
//                 {view == 'summary' && (
//                   <>
//                     <Row>
//                       <Col>
//                         <h3>{data.name}</h3>
//                       </Col>
//                     </Row>

//                     <Row className="mb-4">
//                       <Col>
//                         <p>
//                           Starts on:{' '}
//                           {format(
//                             parseISO(data.eventStartDate),
//                             'eee, dd MMM yy hh:mmbbb'
//                           )}
//                         </p>
//                       </Col>
//                     </Row>

//                     <Row>
//                       <Col xs={6} sm={8}>
//                         <p className="text-dark">
//                           <strong>Ticket Price: </strong>
//                           {formatter.format(data.ticketPrice)}
//                         </p>
//                       </Col>
//                       <Col>
//                         <div className="input-group input-group-sm">
//                           <select
//                             className="custom-select"
//                             id="quantity"
//                             value={boothQt}
//                             onChange={(e) => {
//                               setboothQt(e.target.value);
//                             }}
//                           >
//                             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
//                               <option key={i} value={i}>
//                                 {i}
//                               </option>
//                             ))}
//                           </select>
//                           <div className="input-group-append">
//                             <label
//                               className="input-group-text"
//                               htmlFor="inputGroupSelect02"
//                             >
//                               Qty
//                             </label>
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>

//                     <Row className="mb-5">
//                       <Col>
//                         <p>
//                           Sales end on{' '}
//                           {format(
//                             parseISO(data.saleStartDate),
//                             'eee, dd MMM yy hh:mmbbb'
//                           )}
//                         </p>
//                       </Col>
//                     </Row>

//                     <Row>
//                       <Col>
//                         <h4>Order summary:</h4>
//                       </Col>
//                     </Row>

//                     <Row>
//                       <Col>
//                         <p className="text-dark">
//                           {boothQt} x Standard ticket
//                         </p>
//                       </Col>
//                       <Col className="col-auto">
//                         <p className="text-dark">
//                           {formatter.format(data.ticketPrice * boothQt)}
//                         </p>
//                       </Col>
//                     </Row>
//                     <hr></hr>
//                     <Row className="mb-4">
//                       <Col>
//                         <p className="h4 text-body">Total</p>
//                       </Col>
//                       <Col className="col-auto">
//                         <p className="h5 text-body">
//                           {formatter.format(data.ticketPrice * boothQt)}
//                         </p>
//                       </Col>
//                     </Row>
//                     {/* </Row> */}
//                     </>
//                 )}
//                       </Col>
//                      </Row>
//         </Container>
//         </PartnerWrapper>
//     )
// };

// export default PartnerEventCheckout;