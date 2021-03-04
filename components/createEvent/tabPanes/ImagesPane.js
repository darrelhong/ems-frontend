import { useState } from 'react';
import Image from 'react-bootstrap/Image';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { RMIUploader } from "react-multiple-image-uploader";
import {
  uploadEventImage,
  uploadMultipleEventImage,
} from '../../../lib/query/eventApi';
import api from '../../../lib/ApiClient';

const ImagesPane = ({
  register,
  handleSubmit,
  onSubmit,
  saveDraft,
  eventStatus,
  files,
  setFiles }) => {

  const [fileName, setFileName] = useState();
  // const [fileUpload, setfileUpload] = useState(false);
  // const [file, setFile] = useState('uploadfile');


  const dataSources = [
    {
      id: 1,
      dataURL: 'https://picsum.photos/seed/1/600',
    },
    {
      id: 2,
      dataURL: 'https://picsum.photos/seed/2/600',
    },
    {
      id: 3,
      dataURL: 'https://picsum.photos/seed/3/600',
    },
    {
      id: 4,
      dataURL: 'https://picsum.photos/seed/4/600',
    },
    {
      id: 5,
      dataURL: 'https://picsum.photos/seed/5/600',
    },
    {
      id: 6,
      dataURL: 'https://picsum.photos/seed/6/600',
    },
    // {
    //   id: 7,
    //   dataURL: "https://picsum.photos/seed/7/600",
    // },
    // {
    //   id: 8,
    //   dataURL: "https://picsum.photos/seed/8/600",
    // },
    // {
    //   id: 9,
    //   dataURL: "https://picsum.photos/seed/9/600",
    // },
    // {
    //   id: 10,
    //   dataURL: "https://picsum.photos/seed/10/600",
    // },
  ];

  const handleFileChange = async (e) => {
    console.log('call handleFileChange');
    console.log(e.target.files);
    setFiles(e.target.files);
    console.log(e.target.files[0].name);
    // setFiles(e.target.files[0]);
    console.log(e.target.files[0]);
    // setfileUpload(true);
    let i;
    let combinedFileName = '';
    for (i = 0; i < e.target.files.length; i++) {
      combinedFileName += e.target.files[i].name + ' , ';
    }
    setFileName(combinedFileName);
    // await submitFile();
  };
  const submitFile = async () => {
    const data = new FormData();
    //if(file name is not empty..... handle condition when no file is selected)
    data.append('file', file);
    data.append('eid', 17);
    api
      .post('/api/uploadEventImage', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onSuccess: () => {
          queryClient.invalidateQueries(['user', user?.id.toString()]);
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          console.log('file upload sucessfully');
          console.log(response);
          console.log(response.data['fileDownloadUri']);
          var newlink = response.data['fileDownloadUri'];
          setProfilepicUrl(newlink);
        }
      })
      .catch(() => {
        setShowFailedMsg(true);
      });
  };


  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Event Images</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <Row>
            <Col className="form-group" xs={10} md={6}>

              {/* try to render the image each time they upload  */}
              {/* {files && images.map((image, index) => {
                return (
                  <img src={image} />
                )
              })} */}
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
