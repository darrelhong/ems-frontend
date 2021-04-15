import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import usePaymentMethods from 'lib/query/usePaymentMethodsBP';
import PaymentView from 'components/custom/ticketing/PaymentView';
import CreditCardIcon from 'components/custom/CreditCardIcon';
import { formatter } from 'lib/util/currency';


const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const BPPaymentModal = ({
    event,
    bpId,
    showPaymentModal,
    closePaymentModal
}) => {

    const [pmId, setPmId] = useState();
    const { data: paymentMethods, status: pmStatus } = usePaymentMethods();
    const [view, setView] = useState('summary');

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
                                            { }
                                        </p>
                                    </Col>
                                </Row>

                                <Row className="mb-5">
                                    <Col>
                                        <h4>Order Summary:</h4>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <p className="text-dark">
                                            x Number of Booths
                                    </p>
                                    </Col>
                                    <Col className="col-auto">
                                        <p className="text-dark">
                                            {formatter.format(event?.boothPrice)}
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
                                            {formatter.format(event?.boothPrice)}
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
                            </>
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