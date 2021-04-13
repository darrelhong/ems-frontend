import { Modal, Button, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Col, Form } from 'react-bootstrap';
import { uploadBrochure } from 'lib/query/boothApi';

const AddBrochureModal = ({
    sellerProfileId,
    showModal,
    closeModal
}) => {

    const [files, setFiles] = useState();
    const [fileName,setFileName] = useState('');

    const handleFileChange = async (e) => {
        setFiles(e.target.files);
        // setFiles(e.target.files[0]);
        // setfileUpload(true);
        let i;
        let combinedFileName = '';
        for (i = 0; i < e.target.files.length; i++) {
            combinedFileName += e.target.files[i].name + ' , ';
        }
        setFileName(combinedFileName.slice(0,combinedFileName.length-3));
        // setFileName(combinedFileName);
        // await submitFile();
    };

    const saveImages = async () => {
        const uploadedImages = files;
        // const uploadedImages = getValues('files');
        const length = uploadedImages?.length ?? 0;
        let i;
        console.log('length found: ' + length);
        // console.log(uploadedImages.item(0));
        for (i = 0; i < length; i++) {
            let inputData = new FormData();
            inputData.append('file', uploadedImages.item(i));
            inputData.append('id', sellerProfileId); //temp event ID
            console.log('checking input data');
            console.log(inputData);

            // setImages(images.push(URL.createObjectURL(data[0].file)));
            // setImages(URL.createObjectURL(data[0].file));
            const response = await uploadBrochure(inputData);
            console.log('response:');
            console.log(response);
        }
    };

    const bodyComponent = () => (
        <Modal.Body>
            <Col className="form-group" md={12}>
                <label>
                    Add another brochure (Image File)
            </label>
                <Form.Group>
                    <Form.File
                        id="custom-file"
                        type="file"
                        onChange={handleFileChange}
                        custom
                        multiple
                    />
                    <Form.Label
                        className="form-group custom-file-label"
                        md={12}
                        for="custom-file"
                    >
                        {fileName}
                    </Form.Label>
                </Form.Group>
            </Col>
        </Modal.Body>
    );

    return (
        <Modal
            show={showModal}
            onHide={closeModal}
            centered
        // scrollable
        // size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>Adding a brochure to your profile </Modal.Title>
            </Modal.Header>
            {bodyComponent()}
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
          </Button>
                <Button
                    variant="danger"
                    onClick={saveImages}
                >
                    Upload
          </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddBrochureModal;