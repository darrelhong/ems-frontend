import { Alert, Modal, Button, Row, Col, Container } from 'react-bootstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect, Fragment } from 'react';
import { useMutation } from 'react-query';
import usePaymentMethods from 'lib/query/usePaymentMethodsBP';
import PaymentView from 'components/custom/ticketing/PaymentView';
import CreditCardIcon from 'components/custom/CreditCardIcon';
import { formatter } from 'lib/util/currency';
import ButtonWithLoading from 'components/custom/ButtonWithLoading';
import api from 'lib/ApiClient';


const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const BPPaymentModal = ({
    event,
    partner,
    showPaymentModal,
    sellerProfile,
    closePaymentModal,
    applicationMade
}) => {

    const [clientSecret, setClientSecret] = useState('');
    const [pmId, setPmId] = useState();
    const { data: paymentMethods, status: pmStatus } = usePaymentMethods();
    const [view, setView] = useState('summary');
    const allocatedBooths = [];
    // for (let i = 0; i < sellerProfile?.booths?.length; i++) {
        for (let i = 0; i < applicationMade?.booths?.length; i++) {
        allocatedBooths.push(applicationMade?.booths[i].boothNumber)
        // allocatedBooths.push(sellerProfile?.booths[i].boothNumber)
    }

    // console.log(allocatedBooths)

    const { mutate: checkout, isError, isLoading } = useMutation(
        (data) => api.post('/api/sellerApplication/checkout', data),
        {
            onSuccess: (resp) => {
                if (resp.data.clientSecret) {
                    setCheckoutResponse(resp.data);
                    setClientSecret(resp.data.clientSecret);
                    setView('payment');
                } else {
                    setPaymentCompleteResp(resp.data.tickets);
                    closePaymentModal();
                }
            },
        }
    );

    const handleCardChange = (value) => {
        setPmId(value);
    };

    const onPaymentCompleteResp = (resp) => {
        setPaymentCompleteResp(resp.data);
        closePaymentModal();
    };

    const boothListing = () => {
        const booths = allocatedBooths.map(b => {
            return (
                <Row>
                    <Col>
                        <p className="text-dark">
                            Booth {b}
                        </p>
                    </Col>
                    <Col>
                        <p className="text-dark">
                            {formatter.format(event?.boothPrice)}
                        </p>
                    </Col>
                </Row>
            )
        })
        return <Fragment>{booths}</Fragment>
    }

    const bodyComponent = () => (
        <Modal.Body>
            <Container className="my-4">
                <Row className="justify-content-center">
                    <Col lg={7}>
                        {view == 'summary' ? (
                            <>
                                <Row>
                                    <Col>
                                        <h3>{event?.name}</h3>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col>
                                        <p>by {event?.eventOrganiser.name}</p>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} sm={8}>
                                        <p className="text-dark">
                                            <strong>Individual Booth Price: </strong>
                                            {formatter.format(event?.boothPrice)}
                                        </p>
                                    </Col>

                                    <Col>
                                        <p>
                                            <strong>Allocated Booths: </strong>
                                            {allocatedBooths.toString()}
                                        </p>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row className="mb-5">
                                    <Col>
                                        <h4>Order Summary:</h4>
                                    </Col>
                                </Row>
                                {boothListing()}
                                <hr></hr>
                                <Row className="mb-4">
                                    <Col>
                                        <p className="h4 text-body">Total</p>
                                    </Col>
                                    <Col className="col-auto">
                                        <p className="h5 text-body">
                                            {formatter.format(event?.boothPrice * allocatedBooths.length)}
                                        </p>
                                    </Col>
                                </Row>

                                <h5 className="mb-3">Payment method:</h5>
                                <Row>
                                    <Col>
                                        {paymentMethods?.map((pm) => (
                                            <div className="form-check mb-3" key={pm.id}>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentCard"
                                                    id="newCard"
                                                    checked={pmId === pm.id}
                                                    onChange={() => handleCardChange(pm.id)}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="exampleRadios1"
                                                >
                                                    <CreditCardIcon type={pm.card.brand} />
                              Card ending in {pm.card.last4}
                                                </label>
                                            </div>
                                        ))}
                                        <div className="form-check mb-4">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                onChange={() => handleCardChange(null)}
                                                name="paymentCard"
                                                id="newCard"
                                                checked={!pmId}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="exampleRadios1"
                                            >
                                                Use new card
                          </label>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        {/* {isError && (
                                            <Alert variant="danger" role="alert">
                                                An error has occured. Please refresh and try again.
                                            </Alert>
                                        )} */}
                                        <ButtonWithLoading
                                            className="btn btn-fill-out btn-sm"
                                            onClick={() => checkout({
                                                eventId: event.eid,
                                                boothQty: allocatedBooths.length,
                                                description: event.descriptions,
                                                comments: event.comments,
                                                paymentMethodId: pmId,
                                            })}
                                        // isLoading={isLoading}
                                        >Checkout</ButtonWithLoading>
                                    </Col>
                                </Row>
                            </>
                        ) : view == 'payment' ? (
                            <Elements stripe={promise}>
                                <PaymentView
                                    clientSecret={clientSecret}
                                    partner={partner}
                                    checkoutResponse={checkoutResponse}
                                    onPaymentCompleteResp={onPaymentCompleteResp}
                                    event={event}
                                />
                            </Elements>
                        ) : null}
                    </Col>
                </Row>
            </Container>
        </Modal.Body>
    );

    return (
        <Modal show={showPaymentModal} onHide={closePaymentModal} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Booth Payment</Modal.Title>
            </Modal.Header>
            {bodyComponent()}
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );

}

export default BPPaymentModal;