import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import usePaymentMethods from 'lib/query/usePaymentMethods';
import PaymentView from 'components/custom/ticketing/PaymentView';
import CreditCardIcon from 'components/custom/CreditCardIcon';


const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const BPPaymentModal = (
    event,
    bpId,
    showPaymentModal,
    closePaymentModal
) => {

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
                                        <h3>{event.name}</h3>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col>
                                        <p>by {event.eventOrganiser.name}</p>
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
        <Modal show={showPaymentModal} size="l" centered>
            <Modal.Header closeButton>
            </Modal.Header>
            {bodyComponent()}
        </Modal>
    )

}

export default BPPaymentModal;