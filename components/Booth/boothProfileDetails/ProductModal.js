import { Modal, Button, Row } from 'react-bootstrap';

const ProductModal = ({
    product,
    productModalShow,
    closeModal
}) => {
    return (
        <Modal show={productModalShow} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>{product?.name ?? 'Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <img
                        src={product?.image}
                    />
                </Row>
                <Row
                    style={{
                        marginTop: 10
                    }}>
                    {product?.description}
                </Row>
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

export default ProductModal;