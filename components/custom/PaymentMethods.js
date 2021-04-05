import { Alert } from 'react-bootstrap';

import usePaymentMethods from 'lib/query/usePaymentMethods';

import CenterSpinner from './CenterSpinner';
import CreditCardIcon from './CreditCardIcon';

export default function PaymentMethods() {
  const { data, status } = usePaymentMethods();

  return (
    <>
      {status === 'loading' ? (
        <CenterSpinner />
      ) : status === 'error' ? (
        <Alert variant="danger">An error has occured</Alert>
      ) : (
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
              <button className="btn btn-sm btn-danger">Remove card</button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
