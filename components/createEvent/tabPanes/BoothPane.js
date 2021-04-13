import { useState } from 'react';
import { Row, Col, Form, Card, Image } from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const BoothPane = ({
  register,
  errors,
  // boothlayoutImage,
  setBoothLayoutImage,
  originalLayoutImage
}) => {
  const [fileName, setFileName] = useState('');
  const [imageToView,setImageToView] = useState();

  const handleFileChange = (e) => {
    setBoothLayoutImage(e.target.files[0]);
    // setFileSubmit(e.target.files);
    setImageToView(URL.createObjectURL(e.target.files[0]));
    setFileName(e.target.files[0].name);
  };

  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Booth Details</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <Row>
            <Col className="form-group" md={12}>
              <label>
                Booth Capacity - How many at your event?
                <span className="required">*</span>
              </label>
              <input
                className="form-control"
                name="boothCapacity"
                type="number"
                ref={register({ required: true })}
              />
              {errors.boothCapacity && (
                <span role="alert" style={{ color: 'red' }}>
                  This field is required
                </span>
              )}
            </Col>
            <Col className="form-group" md={12}>
              <label
              //  style={{marginBottom:'10%'}}
              >
                Booth Layout - an image showing the planned layout of all the
                booths
                {/* <span className="required">*</span> */}
              </label>
              <p>Please indicate booth numbers and positions for partners to refer to!</p>
            </Col>
            <Col className="form-group" md={12}>
              <Image
                className="profile-image"
                // src={boothlayoutImage ?? "assets/images/defaultprofilepic.png"}
                src={imageToView ?? originalLayoutImage}
                thumbnail
                style={{ width: '60%' }}
              />
            </Col>
            <Col className="form-group" md={12}>
              <Form.Group>
                <Form.File
                  id="custom-file"
                  type="file"
                  onChange={handleFileChange}
                  custom
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
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

BoothPane.propTypes = {
  register: PropTypes.func,
};

export default BoothPane;
