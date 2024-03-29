import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
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
  event,
}) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [saveCard, setSaveCard] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

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
      setup_future_usage: saveCard ? 'off_session' : null,
    });

    const ticketTransactionIds = checkoutResponse.tickets.map(
      (ticket) => ticket.id
    );

    if (payload.error) {
      await api.post('/api/ticketing/cancel', { ticketTransactionIds });
      router.push({
        pathname: '/attendee/events/checkout-error',
        query: { eventId: event.eid, error: payload.error.message },
      });
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      await api
        .post('/api/ticketing/payment-complete', { ticketTransactionIds })
        .then(onPaymentCompleteResp);
    }
  };

  return (
    <div className="my-3">
      <h5 className="mb-2">
        Payment amount: {formatter.format(checkoutResponse.paymentAmount)}
      </h5>
      <form id="payment-form" onSubmit={handleSubmit} className="mb-5 pb-5">
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={saveCard}
            id="saveCard"
            onClick={() => setSaveCard((prev) => !prev)}
          />
          <label
            className="form-check-label text-small"
            htmlFor="saveCard"
            style={{ fontSize: 15 }}
          >
            Save card for future payments
          </label>
        </div>
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
  event: PropTypes.object,
};
