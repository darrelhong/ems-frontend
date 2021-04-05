import { Modal, Button } from 'react-bootstrap';
import { cancelSellerApplication } from 'lib/query/sellerApplicationApi';

const WithdrawModal = ({applicationMade, setApplicationMade, showWithdrawModal, closeWithdrawModal, createToast}) => {

    const handleWithdraw = async () => {
        try {
            await cancelSellerApplication(applicationMade?.id);
            setApplicationMade(null);
            createToast('Withdrawn Successfully', 'success');
        } catch (e)  {
        createToast('Error, please try again later', 'error');
        }
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
                <Button
                    variant="danger"
                    onClick={() => handleWithdraw()}
                    // onClick={() => handleDeleteCancel(currEvent)}
                >
                    Proceed
          </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default WithdrawModal;