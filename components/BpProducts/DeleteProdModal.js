import { Modal, Button } from 'react-bootstrap';
import { deleteProduct } from 'lib/query/productApi';

const DeleteProdModal = ({product, showDeleteModal, closeModal}) => {


    // const [showDeleteModal, setshowDeleteModal] = useState(false);
    // const closeModal = () => setshowDeleteModal(false);

    const handleDelete = async () => {
        await deleteProduct(product?.pid);
        closeModal();
    };

    return (
        <Modal show={showDeleteModal} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Deleting a product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you wish to delete <strong>{product?.name ?? 'this product'}</strong>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
          </Button>
                <Button
                    variant="danger"
                    onClick={() => handleDelete()}
                >
                    Proceed
          </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteProdModal;