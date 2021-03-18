import { Modal, Button, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const AddProductModal = ({
    booth,
    bpProducts,
    addProductModalShow,
    closeAddProductModal
}) => {
    const [removeProduct, setRemoveProduct] = useState(false);
    const [booth,setBooth] = useState(Object);
    const [boothProducts,setBoothProducts] = useState([]);

    useEffect(()=>{
        const loadData = () => {
            
        };
        if (booth) loadData();
    },[]);

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
                closeAddProductModal();
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
        <Modal show={addProductModalShow} onHide={() => {
            setRemoveProduct(false);
            closeAddProductModal();
        }}
            centered>
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

export default AddProductModal;