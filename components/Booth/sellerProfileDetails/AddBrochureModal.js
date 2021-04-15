import { Modal, Button, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Col, Form } from 'react-bootstrap';
import { uploadBrochure, getSellerProfile } from 'lib/query/boothApi';

const AddBrochureModal = ({
    sellerProfileId,
    showModal,
    closeModal,
    setSellerProfile,
    createToast
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
        await uploadBrochures();
        await reloadData();
        closeWithReset();
    }

    const uploadBrochures = async () => {
        const uploadedImages = files;
        const length = uploadedImages?.length ?? 0;
        let i;
        console.log('length found: ' + length);
        try {
            for (i = 0; i < length; i++) {
                let inputData = new FormData();
                inputData.append('file', uploadedImages.item(i));
                inputData.append('id', sellerProfileId); //temp event ID
                await uploadBrochure(inputData);
            }
            createToast('Brochures successfully uploaded!','success');
        } catch (e) {
            createToast('There was an error, please try again later','error');
        };
    };

    const reloadData = async () => {
        const updatedProfile = await getSellerProfile(sellerProfileId);
        setSellerProfile(updatedProfile);
    }

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

    const closeWithReset = () => {
        setFileName('');
        closeModal();
    };

    return (
      <Modal
        show={showModal}
        onHide={closeWithReset}
        centered
        // scrollable
        // size='xl'
      >
        <Modal.Header closeButton>
          <Modal.Title>Adding a brochure to your profile </Modal.Title>
        </Modal.Header>
        {bodyComponent()}
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn-sm"
            onClick={closeWithReset}
          >
            Close
          </Button>
          <Button variant="danger" onClick={saveImages} className="btn-sm">
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default AddBrochureModal;