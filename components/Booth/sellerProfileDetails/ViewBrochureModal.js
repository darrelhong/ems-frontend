import { Modal, Button } from 'react-bootstrap';
const ViewBrochureModal = ({
    image,
    closeViewBrochureModal,
    viewBrochureModalShow
}) => {

    const closeButton = () => {
        return (
            <Button variant="secondary" onClick={() => {
                closeViewBrochureModal();
            }}>
                Close
            </Button>
        )
    };

    return (
        <Modal show={viewBrochureModalShow} onHide={closeViewBrochureModal}
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Brochure</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={image} />
            </Modal.Body>
            <Modal.Footer>
                {closeButton()}
            </Modal.Footer>
        </Modal>
    );
};

export default ViewBrochureModal;