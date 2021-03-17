import { Modal, Button, Row } from 'react-bootstrap';
import RemoveProductModal from './RemoveProductModal';
import { useState } from 'react';

const ProductModal = ({
    product,
    productModalShow,
    closeProductModal
}) => {
    const [removeModalShow, setRemoveModalShow] = useState(false);
    const [removeProduct, setRemoveProduct] = useState(false);

    const bodyComponent = () => (
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
            {removeProduct && (
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
    );

    const secondaryButton = () => {
        if (removeProduct) {
            return (
                <Button variant="secondary" onClick={() => {
                    setRemoveProduct(false);
                }}>
                    Cancel
                </Button>
            )
        } else return (
            <Button variant="secondary" onClick={() => {
                closeProductModal();
            }}>
                Close
            </Button>
        )
    };

    const cancelButton = () => {

        if (removeProduct) {
            return (
                <Button
                    variant="danger"
                    onClick={() => {
                        console.log('removing product!');
                    }
                    }
                >
                    Yes, remove it
                </Button>
            )
        } else {
            return (
                <Button
                    variant="danger"
                    onClick={() => {
                        if (!removeProduct) {
                            setRemoveProduct(true);
                        } else {
                            console.log('removing product!');
                            // handleRemove();
                        }
                    }}
                >
                    Remove
                </Button>
            )
        }
    }

    return (
        <Modal show={productModalShow} onHide={() => {
            setRemoveProduct(false);
            closeProductModal();
        }}
            centered>
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
            {bodyComponent()}
            <Modal.Footer>
                {secondaryButton()}
                {cancelButton()}
            </Modal.Footer>
        </Modal>
    );
};

export default ProductModal;