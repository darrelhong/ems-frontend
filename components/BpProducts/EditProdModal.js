import { useState } from 'react';
import { Modal, Button, Col, Row, Form, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { createProduct, updateProduct } from 'lib/query/productApi';

const EditProdModal = ({ showEditProdModal, closeShowEditProdModal, product, createToast, loadProducts }) => {
    const [fileName, setFileName] = useState();
    const [tempImageUrl, setTempImageUrl] = useState(null);
    const id = localStorage.getItem('userId');
    const [editMode, setEditMode] = useState(false);
    const [noImage, setNoImage] = useState(false);
    const [file, setFile] = useState();

    const {
        register,
        handleSubmit,
        errors,
        setValue
    } = useForm();

    const closeModal = () => {
        closeShowEditProdModal();
        setTempImageUrl(null);
        setFileName(null);
        setEditMode(false);
    };

    const cancelEditMode = () => {
        setTempImageUrl(null);
        setFileName(null);
        setEditMode(false);
        setValue('name', product.name);
        setValue('description', product.description);
    };

    const handleFileChange = async (e) => {
        const imageFile = e.target.files[0];
        setFile(imageFile);
        // setTempImageUrl(URL.createObjectURL(e.target.files[0]));
        setTempImageUrl(URL.createObjectURL(imageFile));
        setFileName(imageFile.name);
        // await submitFile();
    };

    const onSubmit = async (data) => {
        if (!product?.image && !data.image) {
            setNoImage(true);
        }
        //can proceed to create / update
        else {
            if (product) {
                try {
                    await updateProduct(data, file, product.pid);
                    loadProducts();
                    createToast('Producted updated successfully!', 'success');
                } catch (e) {
                    createToast('Product could not be updated, try again later!', 'error');
                }
            } else createToast('Product could not be updated, try again later!', 'error');
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
                        disabled={product && !editMode}
                        defaultValue={product?.name}
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
                        disabled={product && !editMode}
                        defaultValue={product?.description}
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
                        src={tempImageUrl ?? product?.image}
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
                            disabled={product && !editMode}
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
                {nameComponent()}
                {descriptionComponent()}
                {imageComponent()}
            </form>
        </Modal.Body>
    )
    return (
        <Modal show={showEditProdModal} onHide={() => closeModal()} centered>
            <Modal.Header closeButton>
                <Modal.Title>{product ? product.name : 'Adding a new Product'}</Modal.Title>
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
                {editMode ? (
                    <div>
                        <Button variant="secondary" onClick={() => cancelEditMode()}>
                            Cancel
                    </Button>
                        <Button
                            variant="danger"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Save
                </Button>
                    </div>
                ) : (
                    <div>
                        <Button variant="secondary" onClick={() => closeModal()}>
                            Close
                    </Button>
                        <Button
                            variant="primary"
                            onClick={() => setEditMode(true)}
                        >
                            Edit
                    </Button>
                    </div>
                )}

            </Modal.Footer>
        </Modal>
    );
};

export default EditProdModal;