import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

import styles from './ApplicationCard.module.css';

export default function ApplicationCard({ application }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <>
      <div className={styles.item} onClick={() => setShow(true)}>
        <div>{application.content}</div>
        <small>{application.bpName}</small>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {application.content}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Applicant</h6>
          <p className="text-dark">{application.bpName}</p>

          <h6>Description</h6>
          <p className="text-dark">{application.description}</p>

          <h6>Status</h6>
          <p className="text-dark">{application.status}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

ApplicationCard.propTypes = {
  application: PropTypes.object,
};
