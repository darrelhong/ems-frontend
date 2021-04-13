import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
const ImagesPane = ({
  register,
  handleSubmit,
  onSubmit,
  saveDraft,
  eventStatus,
  eventImagesJson,
  setEventImagesJson,
  imagesToDelete,
  setImagesToDelete,
}) => {
  const [fileName, setFileName] = useState('');

  const newHandleFileChange = (e) => {
    let newFileName = fileName;
    if (newFileName) newFileName += ', ';

    //ITERATE THROUGH THE FILES ADDED
    for (let i = 0; i < e.target.files.length; i++) {
      //CHANGE THE COMBINED NAME
      newFileName += e.target.files[i].name + ' , ';

      //ADD TO THE FILE ARRAY
      eventImagesJson.push({
        file: e.target.files[i],
        imageUrl: window.URL.createObjectURL(e.target.files[i]),
      });
    }
    setEventImagesJson(eventImagesJson);
    setFileName(newFileName.slice(0, newFileName.length - 3));
  };

  const removeFileNew = (imageJsonToRemove) => {
    const remainingFiles = eventImagesJson.filter(
      (eventImage) => eventImage != imageJsonToRemove
    );
    setEventImagesJson(remainingFiles);
    if (imageJsonToRemove.file == null) {
      //means its an original file to be deleted
      console.log('need to go delete this image');
      imagesToDelete.push(imageJsonToRemove.imageUrl);
      setImagesToDelete(imagesToDelete);
    }
  };

  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Event Images</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <Row>
            <Col className="form-group" xs={10} md={12}>
              <Row>
                {/* try to render the image each time they upload  */}
                {/* {files && images.map((image, index) => {
                return (
                  <img src={image} />
                )
              })} */}
                {/* <div className="form-group multi-preview"> */}
                {/* {filesTest!= undefined && filesTest.map((url,key) => (<><img src={url} style={{maxWidth:"30%", maxHeight:"15%"}}/>  <button type="button"className="btn btn-border-fill btn-sm" onClick={() => deleteFile(key)}>
              <BsFillTrashFill />
                </button></>))} */}
                {eventImagesJson != undefined &&
                  eventImagesJson.map((imageJson, key) => (
                    // {filesToDisplay!= undefined && filesToDisplay.map((url,key) => (

                    <Col md={3}>
                      <img
                        src={imageJson?.imageUrl}
                        style={{ position: 'relative' }}
                      />
                      <button
                        type="button"
                        className="close"
                        style={{
                          right: '0px',
                          position: 'absolute',
                          zIndex: '1',
                        }}
                        onClick={() => removeFileNew(imageJson)}
                      >
                        <span>&times;</span>
                      </button>
                    </Col>
                    // </div>
                  ))}
              </Row>
              {/* </div> */}
            </Col>
          </Row>
          <Col className="form-group" md={12}>
            <Form.Group>
              <Form.File
                id="custom-file"
                type="file"
                onChange={newHandleFileChange}
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
