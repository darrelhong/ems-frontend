import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { cancelSellerApplication } from 'lib/query/sellerApplicationApi';
import { withdrawApplicationNotif } from 'lib/query/notificationApi';
import ButtonWithLoading from 'components/custom/ButtonWithLoading';

const WithdrawModal = ({applicationMade, setApplicationMade, showWithdrawModal, closeWithdrawModal, createToast}) => {
    const [loading,setLoading] = useState(false);
    const bpid = localStorage.getItem('userId');

    const handleWithdraw = async () => {
        setLoading(true);
        try {
            await cancelSellerApplication(applicationMade?.id);
            await withdrawApplicationNotif(applicationMade?.id,bpid);
            setApplicationMade(null);
            createToast('Withdrawn Successfully', 'success');
        } catch (e)  {
        createToast('Error, please try again later', 'error');
        }
        setLoading(false);
        closeWithdrawModal();
    }

    return (
        <Modal show={showWithdrawModal} onHide={closeWithdrawModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Withdrawing your Application</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                 Are you sure you wish to withdraw your application?
                 <strong>{applicationMade?.paymentStatus && ' Refunds will not be provided for your payment.'}</strong>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeWithdrawModal}>
                    Close
          </Button>
                {/* <Button
                    variant="danger"
                    onClick={() => handleWithdraw()}
                    // onClick={() => handleDeleteCancel(currEvent)}
                >
                    Proceed
          </Button> */}
          <ButtonWithLoading
                        onClick={() => handleWithdraw()}
                        name="submit"
                        value="submit"
                        className="btn btn-fill-out"
                        isLoading={loading}
                      >
                        Confirm
                      </ButtonWithLoading>
            </Modal.Footer>
        </Modal>
    );
};

export default WithdrawModal;