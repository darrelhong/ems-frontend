import { Modal, Button, Row } from 'react-bootstrap';
import RemoveProductModal from './RemoveProductModal';
import { useState } from 'react';

const ProductModal = ({
    product,
    productModalShow,
    closeProductModal
}) => {
    const [removeModalShow, setRemoveModalShow] = useState(false);

    return (
        <Modal show={productModalShow} onHide={closeProductModal} centered>
            <RemoveProductModal
                removeModalShow={removeModalShow}
                closeModal={() => {
                    setRemoveModalShow(false);
                }}
                product={product}
            />

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
                    closeProductModal();
                }}>
                    Close
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        // closeProductModal();
                        setRemoveModalShow(true);
                    }}
                // onClick={() => console.log('removing event!')}
                >
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductModal;