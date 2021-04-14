import { Modal, Button, Row} from 'react-bootstrap';
import { useState } from 'react';
import { removeBrochureMethod } from 'lib/query/boothApi';

const ViewBrochureModal = ({
    image,
    closeViewBrochureModal,
    viewBrochureModalShow,
    brochureIndex,
    isPartner,
    setSellerProfile,
    sellerProfileId,
    createToast
}) => {
    const [removeBrochure, setRemoveBrochure] = useState(false);

    const handleRemove = async () => {
        try {
            const updatedProfile = await removeBrochureMethod(sellerProfileId, image);
            setSellerProfile(updatedProfile);
            closeViewBrochureModal();
            createToast('Brochure successfully removed!', 'success');
        } catch (e) {
            closeViewBrochureModal();
            createToast('Could not be removed, please try again later!', 'error')
        }
        setRemoveBrochure(false);
    };

    const closeButton = () => {
        return (
            <Button variant="secondary" onClick={() => {
                closeModalResetValues();
            }}>
                Close
            </Button>
        )
    };

    const removeButton = () => {
        if (removeBrochure) {
            return (
                <Button
                    variant="danger"
                    onClick={handleRemove}
                >
                    Yes, remove it
                </Button>
            )
        } else {
            return (
                <Button
                    variant="danger"
                    onClick={() => {
                         setRemoveBrochure(true);
                    }}
                >
                    Remove
                </Button>
            )
        }
    }

    const closeModalResetValues = () => {
        setRemoveBrochure(false);
        closeViewBrochureModal();
    }

    return (
        <Modal show={viewBrochureModalShow} onHide={closeModalResetValues}
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Brochure {brochureIndex}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={image} />
                {removeBrochure && (
                <Row
                    style={{
                        marginTop: 10,
                        color: 'red'
                    }}
                >
                    Are you sure you want to remove the product?
                </Row>
            )}
            </Modal.Body>
            <Modal.Footer>
                {closeButton()}
                {isPartner && removeButton()}
            </Modal.Footer>
        </Modal>
    );
};

export default ViewBrochureModal;