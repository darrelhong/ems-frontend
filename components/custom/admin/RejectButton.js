import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import cx from 'classnames';

import ButtonWithLoading from '../ButtonWithLoading';

export default function RejectButton({
  eo,
  reject,
  rejectIsLoading,
  rejectIsSuccess,
}) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (rejectIsSuccess) {
      setShow(false);
      setMessage('');
    }
  }, [rejectIsSuccess]);

  return (
    <>
      <ButtonWithLoading
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => setShow(true)}
        isLoading={rejectIsLoading}
      >
        Reject
      </ButtonWithLoading>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Event Organiser</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="message">Please enter reason for rejection</label>
          <textarea
            className={cx('form-control', { 'is-invalid': error })}
            id="message"
            rows="3"
            onChange={(e) => {
              setError(false);
              setMessage(e.target.value);
            }}
          />
          <div className="invalid-feedback">Message is required!</div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-fill-out btn-sm"
            onClick={() =>
              message ? reject({ id: eo.id, message }) : setError(true)
            }
          >
            Reject
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

RejectButton.propTypes = {
  eo: PropTypes.object.isRequired,
  reject: PropTypes.func.isRequired,
  rejectIsLoading: PropTypes.bool.isRequired,
  rejectIsSuccess: PropTypes.bool.isRequired,
};
