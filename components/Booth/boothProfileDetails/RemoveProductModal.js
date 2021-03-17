import { Modal, Button, Row } from 'react-bootstrap';

const RemoveProductModal = ({
    product,
    removeModalShow,
    closeModal
}) => {
    return (
        <Modal show={removeModalShow} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Removing {product?.name ?? 'Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to remove this {product?.name} from this event?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    console.log(product.name);
                    closeModal();
                }}>
                    Close
                </Button>
                <Button
                    variant="danger"
                    onClick={() => console.log('removing event!')}
                >
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveProductModal;