import { useState } from 'react';
import PropTypes from 'prop-types';
import { RMIUploader } from "react-multiple-image-uploader";
import {
  uploadEventImage,
  uploadMultipleEventImage,
} from '../../../lib/query/eventApi';
import api from '../../../lib/ApiClient';
import {
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Tab,
  Nav,
  Card,
  Form,
  Button,
  Modal,
  Image,
  Alert,
} from 'react-bootstrap';
// import ImageScroller from 'react-image-scroller';

const ImagesPane = ({
  register,
  handleSubmit,
  onSubmit,
  saveDraft,
  eventStatus,
  files,
  setFiles,
  images }) => {

  const [fileName, setFileName] = useState();
  // const [fileUpload, setfileUpload] = useState(false);
  // const [file, setFile] = useState('uploadfile');

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

  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Event Images</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <Row>
            <Col className="form-group" xs={10} md={12}
              style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
            >
              {images && images.map((image, index) => {
                return (
                  <div
                  // style={{
                  //   display: 'inline',
                  //   position: 'relative',
                  //   width: '100%',
                  //   height: '100%'
                  // }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                      <Image
                        // className="close"
                        // className="profile-image"
                        style={{ height: "230px", width: "250px" }}
                        thumbnail
                        src={image} />
                      <button
                        type="reset"
                        className="btn btn-fill-out btn-sm"
                        name="submit"
                        value="Submit"
                        ref={register()}
                        onClick={handleSubmit(onSubmit)}
                        style={{width:'45%', textAlign:'center'}}
                      >
                        Remove
                      </button>

                      {/* <Button style={{width:'50%'}}>yo</Button> */}

                      {/* <Image
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          height: 50,
                          width: 50
                        }}
                        src="data:image/png;base64,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" />
                         */}
                    </div>
                  </div>
                )
              })}
            </Col>
          </Row>
          <Col className="form-group" md={12}>
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

          <Col>
            {eventStatus != 'CREATED' && (
              <button
                type="button"
                name="saveDraft"
                className="btn btn-border-fill btn-sm"
                onClick={saveDraft}
              >
                Save as Draft
              </button>
            )}
            <button
              type="submit"
              className="btn btn-fill-out btn-sm"
              name="submit"
              value="Submit"
              ref={register()}
              onClick={handleSubmit(onSubmit)}
            >
              {eventStatus == 'CREATED' ? 'Save Changes' : 'Create Event'}
            </button>
          </Col>
        </div>
      </Card.Body>
    </Card>
  );
};

ImagesPane.propTypes = {
  register: PropTypes.func,
};

export default ImagesPane;
