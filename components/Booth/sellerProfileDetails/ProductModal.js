import { Modal, Button, Row } from 'react-bootstrap';
import { useState } from 'react';
import { removeBoothProduct } from 'lib/query/productApi';

const ProductModal = ({
    product,
    productModalShow,
    closeProductModal,
    boothId,
    setBooth,
    createToast,
    isPartner
}) => {
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

    const handleRemove = async () => {
        try {
            const updatedBoothData = await removeBoothProduct(product.pid, boothId);
            setBooth(updatedBoothData);
            closeProductModal();
            createToast('Product successfully removed!', 'success');
        } catch (e) {
            closeProductModal();
            createToast('Could not be removed, please try again later!', 'error')
        }
    };

    const removeButton = () => {
        if (removeProduct) {
            return (
                <Button
                    variant="danger"
                    onClick={() => {
                        handleRemove();
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
            <Modal.Header closeButton>
                <Modal.Title>{product?.name ?? 'Product'}</Modal.Title>
            </Modal.Header>
            {bodyComponent()}
            <Modal.Footer>
                {secondaryButton()}
                {isPartner && removeButton()}
            </Modal.Footer>
        </Modal>
    );
};

export default ProductModal;