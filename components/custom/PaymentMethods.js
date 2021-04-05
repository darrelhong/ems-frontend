import { useEffect, useState } from 'react';
import { Alert, Modal } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';

import usePaymentMethods from 'lib/query/usePaymentMethods';
import api from 'lib/ApiClient';

import CenterSpinner from './CenterSpinner';
import CreditCardIcon from './CreditCardIcon';

export default function PaymentMethods() {
  const [show, setShow] = useState(false);
  const [pmIdToRemove, setPmIdToRemove] = useState();

  const queryClient = useQueryClient();
  const { data, status } = usePaymentMethods();
  const { mutate, isSuccess, isError } = useMutation(
    (data) => api.post('/api/ticketing/payment-methods/remove', data),
    { onSuccess: () => queryClient.invalidateQueries('paymentMethods') }
  );

  useEffect(() => {
    if (isSuccess) {
      setShow(false);
    } else if (isError) {
      alert('An error occured');
      setShow(false);
    }
  }, [isSuccess, isError]);
  return (
    <>
      {status === 'loading' ? (
        <CenterSpinner />
      ) : status === 'error' ? (
        <Alert variant="danger">An error has occured</Alert>
      ) : data.length > 0 ? (
        data.map((pm) => (
          <div className="card mb-3" key={pm.id}>
            <div className="card-body">
              <div>
                <CreditCardIcon type={pm.card.brand} size="4em" />
              </div>
              <h5 className="card-title">Card ending in {pm.card.last4}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Expires {pm.card.expMonth}/{pm.card.expYear}
              </h6>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => {
                  setPmIdToRemove(pm.id);
                  setShow(true);
                }}
              >
                Remove card
              </button>
            </div>
          </div>
        ))
      ) : (
        <h5>No payment methods found</h5>
      )}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Remove card</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove card?</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-fill-out btn-sm"
            onClick={() => mutate({ paymentMethodId: pmIdToRemove })}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
