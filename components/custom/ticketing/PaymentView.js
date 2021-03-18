import PropTypes from 'prop-types';
import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import styles from './PaymentView.module.css';
import { formatter } from 'lib/util/currency';
import api from 'lib/ApiClient';

export default function PaymentView({
  clientSecret,
  attendee,
  checkoutResponse,
  onPaymentCompleteResp,
}) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email:
        process.env.NODE_ENV == 'development'
          ? process.env.NEXT_PUBLIC_DEV_EMAIL
          : attendee.email,
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      const ticketTransactionIds = checkoutResponse.tickets.map(
        (ticket) => ticket.id
      );
      await api
        .post('/api/ticketing/payment-complete', { ticketTransactionIds })
        .then(onPaymentCompleteResp);
    }
  };

  return (
    <div className="my-3">
      <h5 className="mb-3">
        Payment amount: {formatter.format(checkoutResponse.paymentAmount)}
      </h5>
      <form id="payment-form" onSubmit={handleSubmit} className="mb-5 pb-5">
        <CardElement className={styles.cardElement} onChange={handleChange} />
        <button
          disabled={processing || disabled || succeeded}
          id="submit"
          className={styles.payButton}
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner-border spinner-border-sm"></div>
            ) : (
              'Pay now'
            )}
          </span>
        </button>
        {error && (
          <div className="text-danger mt-1" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

PaymentView.propTypes = {
  clientSecret: PropTypes.string,
  attendee: PropTypes.object,
  checkoutResponse: PropTypes.object,
  onPaymentCompleteResp: PropTypes.object,
};
