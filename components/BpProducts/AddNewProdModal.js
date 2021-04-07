import { useState } from 'react';
import { Modal, Button, Col, Row, Form, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { createProduct, updateProduct } from 'lib/query/productApi';

const AddNewProdModal = ({ showAddProdModal, closeAddProdModal, createToast, loadProducts }) => {
    const [fileName, setFileName] = useState();
    const [tempImageUrl, setTempImageUrl] = useState(null);
    const id = localStorage.getItem('userId');
    // const [editMode, setEditMode] = useState(product !== null);
    const [noImage, setNoImage] = useState(false);
    const [file, setFile] = useState();

    const {
        register,
        handleSubmit,
        errors,
    } = useForm();

    const closeModal = () => {
        closeAddProdModal();
        setTempImageUrl(null);
        setFileName(null);
        // setEditMode(product !== null);
    };

    const handleFileChange = async (e) => {
        const imageFile = e.target.files[0];
        setFile(imageFile);
        // setTempImageUrl(URL.createObjectURL(e.target.files[0]));
        setTempImageUrl(URL.createObjectURL(imageFile));
        setFileName(imageFile.name);
        setNoImage(false);
        // await submitFile();
    };

    const onSubmit = async (data) => {
        if (!file) {
            setNoImage(true);
        }
        //can proceed to create / update
        else {
            try {
                await createProduct(id, data, file);
                createToast('Product created successfully', 'success');
                loadProducts();
            } catch (e) {
                createToast('Erorr creating the prouduct, try again later!', 'error');
            }
            closeModal();
        }
    };

    const nameComponent = () => (
        <div>
            <Row>
                <Col xs={6} sm={8}>
                    <p className="text-dark">
                        <strong>Product Name:</strong><span className="required">*</span>
                    </p>
                    {/* <br/> */}
                </Col>
            </Row>

            <Row>
                <Col>
                    <input
                        className="form-control"
                        name="name"
                        type="text"
                        ref={register({ required: true })}
                        style={{
                            marginBottom: '5%'
                        }}
                    />
                    {errors.name && (
                        <div
                            className="alert alert-danger"
                            role="alert"
                            style={{
                                marginTop: '3%'
                            }}
                        >
                            Please add a product name
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );

    const descriptionComponent = () => (
        <div>
            <Row>
                <Col xs={6} sm={8}>
                    <p className="text-dark">
                        <strong>Product Description:</strong><span className="required">*</span>
                    </p>
                    {/* <br/> */}
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <p>A short description of what the product is about!</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <textarea
                        className="form-control"
                        name="description"
                        ref={register({ required: true })}
                        style={{
                            marginBottom: '5%'
                        }}
                    />
                    {errors.description && (
                        <div
                            className="alert alert-danger"
                            role="alert"
                            style={{
                                marginTop: '3%'
                            }}
                        >
                            Please leave a short description
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );

    const imageComponent = () => (
        <div>
            <Row>
                <Col xs={6} sm={8}>
                    <p className="text-dark">
                        <strong>Product Image:</strong><span className="required">*</span>
                    </p>
                    {/* <br/> */}
                    <Image
                        className="profile-image"
                        src={tempImageUrl}
                    // thumbnail
                    />
                </Col>
            </Row>
            <Row>
                <Col
                // className="form-group" md={12}
                >
                    <Form.Group>
                        <Form.File
                            id="custom-file"
                            name="image"
                            type="file"
                            onChange={handleFileChange}
                            custom
                            ref={register()}
                        // multiple
                        />
                        <Form.Label
                            className="form-group custom-file-label"
                            md={12}
                            for="custom-file"
                        >
                            {fileName}
                        </Form.Label>

                    </Form.Group>
                    {noImage && (
                        // {errors.image && (
                        <div
                            className="alert alert-danger"
                            role="alert"
                            style={{
                                marginTop: '3%'
                            }}
                        >
                            Please upload an image
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );

    const bodyFormComponent = () => (
        <Modal.Body>
            <form>
                <Row className="mb-4">
                    <Col>
                        <p className="text-dark">
                            Add more products to list on events you participate in!
                        </p>
                    </Col>
                </Row>
                {nameComponent()}
                {descriptionComponent()}
                {imageComponent()}
            </form>
        </Modal.Body>
    )
    return (
        <Modal show={showAddProdModal}
            onHide={() => closeModal()}
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Adding a new Product</Modal.Title>
            </Modal.Header>
            {bodyFormComponent()}
            {/* <Modal.Body>
                <Col
                    className="space-mb--4">
                    <div className="product-list__info">
                        <div className="product-description">
                            <p><strong>Description</strong></p>
                        </div>
                    </div>
                </Col>
            </Modal.Body> */}
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setEditMode(false)}>
                    Cancel
                    </Button>

                <Button
                    variant="danger"
                    onClick={handleSubmit(onSubmit)}
                >
                    Save
                    </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddNewProdModal;