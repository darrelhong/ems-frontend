import { Modal, Button, Col } from 'react-bootstrap';
import ApplicationCard from 'components/events/organiser/applications/ApplicationCard';

const ApproveRejectModal = ({
    showApproveRejectModal,
    closeApproveRejectModal,
    action,
    handleSubmit,
    application
}) => {

    const getTitle = () => {
        if (action == 'approve') {
            return `Approving ${application?.businessPartner?.name}'s application`;
        }
        return `Rejecting ${application?.businessPartner?.name}'s application`
    }
    return (
        <Modal
            show={showApproveRejectModal}
            onHide={() => {
                closeApproveRejectModal();
            }}
            centered
            size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{getTitle()}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ApplicationCard app={application}/>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={closeApproveRejectModal}
                >
                    Cancel
                    </Button>

                <Button variant="danger"
                    onClick={handleSubmit}
                    name="submit"
                    value="submit"
                >Confirm</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ApproveRejectModal;