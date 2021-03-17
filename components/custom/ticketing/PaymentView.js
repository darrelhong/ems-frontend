import PropTypes from 'prop-types';
import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import styles from './PaymentView.module.css';

export default function PaymentView({ clientSecret }) {
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
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="my-5 py-5">
      <CardElement className={styles.cardElement} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
        className={styles.payButton}
      >
        <span id="button-text">
          {!processing ? (
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
  );
}

PaymentView.propTypes = {
  clientSecret: PropTypes.string,
};
