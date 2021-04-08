import { Modal, Button, Col } from 'react-bootstrap';
import ApplicationCard from 'components/events/organiser/applications/ApplicationCard';
import ButtonWithLoading from 'components/custom/ButtonWithLoading';

const ApproveRejectModal = ({
    showApproveRejectModal,
    closeApproveRejectModal,
    action,
    handleSubmit,
    application,
    loading
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

                    <ButtonWithLoading
                        onClick={handleSubmit}
                        name="submit"
                        value="submit"
                        className="btn btn-fill-out"
                        isLoading={loading}
                      >
                        Confirm
                      </ButtonWithLoading>
{/* 
                <Button variant="danger"
                    onClick={handleSubmit}
                    name="submit"
                    value="submit"
                >Confirm</Button> */}
            </Modal.Footer>
        </Modal>
    )
};

export default ApproveRejectModal;