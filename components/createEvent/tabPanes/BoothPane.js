import { useState } from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const BoothPane = ({
  register,
  errors,
  boothlayoutImage,
  setBoothLayoutImage,
}) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    setBoothLayoutImage(e.target.files[0]);
    // setFileSubmit(e.target.files);
    console.log(e.target.files + 'setfiles');
    // let fileTest = [];
    // let i;
    // let combinedFileName = '';
    // let fileNameTests = [];
    // for (i = 0; i < e.target.files.length; i++) {
    // combinedFileName += e.target.files[i].name + ' , ';
    // fileTest.push(window.URL.createObjectURL(e.target.files[i]));
    // fileNameTests.push(e.target.files[i].name);
    // }
    // setFilesTest(fileTest);
    setFileName(e.target.files[0].name);
    // setFileNameTest(fileNameTests);
    // await submitFile();
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
