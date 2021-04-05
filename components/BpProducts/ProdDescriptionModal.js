import { Modal, Button, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const ProdDescriptionModal = ({ product, showProdDetailModal, closeShowProdDetailModal }) => {

    const [deleteProduct, setDeleteProduct] = useState(false);

    return (
        <Modal show={showProdDetailModal} onHide={closeShowProdDetailModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>{product?.name}</Modal.Title>
            </Modal.Header>
            {/* <Modal.Body>
                <Col
                className="space-mb--50">
             <div className="product-list__info">
                    <div className="product-description">
                        <p><strong>Description</strong></p>
                        {product?.description}
                    </div>
                </div>
                </Col>
            </Modal.Body> */}
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
                {deleteProduct && (
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
                {/* <Button variant="secondary" onClick={closeShowProdDetailModal}>
                    Close
          </Button>
                <Button
                    variant="primary"
                >
                    Proceed 
          </Button> */}
                <IconButton aria-label="fav" color="secondary">
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="fav" color="secondary">
                    <DeleteIcon />
                </IconButton>
            </Modal.Footer>
        </Modal>
    );
};

export default ProdDescriptionModal;