import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({currEvent, deleteModalShow, closeModal, deleteCancelEvent}) => {


    // const [deleteModalShow, setDeleteModalShow] = useState(false);
    // const closeModal = () => setDeleteModalShow(false);

    const handleDeleteCancel = async (currEvent) => {
        await deleteCancelEvent(currEvent);
        closeModal();
    };

    const checkCanDelete = () => {
        if (
            (currEvent.eventBoothTransactions?.length == 0 || !currEvent.eventBoothTransactions)
            && (currEvent.ticketTransactions?.length == 0 || !currEvent.ticketTransactions)
        ) {
            return true;
        }
        return false;
    };


    return (
        <Modal show={deleteModalShow} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete An Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {checkCanDelete(currEvent)
                    ? 'Are you sure you want to delete this event?'
                    : 'Unable to delete this Event. Do you want to cancel this event?'}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
          </Button>
                <Button
                    variant="primary"
                    onClick={() => handleDeleteCancel(currEvent)}
                >
                    Proceed
          </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;