import Link from 'next/link';
import { useState, useEffect } from 'react';
// import { LayoutOne } from '../../layouts';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { Container, Row, Col } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import PartnerWrapper from '../../components/wrapper/PartnerWrapper';

import {
  IoIosCash,
  IoIosPerson,
  IoIosSettings,
  IoIosRadioButtonOn,
} from 'react-icons/io';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import useUser from '../../lib/query/useUser';
import { useMutation, useQueryClient } from 'react-query';
import api from '../../lib/ApiClient';
import { logout } from '../../lib/auth';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

const MyAccount = () => {
  const [fileUpload, setfileUpload] = useState(false);
  const [file, setFile] = useState('uploadfile');

  const [fileName, setFileName] = useState('Choose image');

  const { data: user } = useUser(localStorage.getItem('userId'));

  //const profiepicSrcUrl = user?.profilePic;
  const [profilepicUrl, setProfilepicUrl] = useState(user?.profilePic);
  // display the inital profile picture
  useEffect(() => {
    setProfilepicUrl(user?.profilePic);
  }, [user?.profilePic]);
  useEffect(() => {
    setFileName('Choose image');
  }, ['Choose image']);

  //for modal of disabling account
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const queryClient = useQueryClient();

  // success message for update account details
  const [accSuccess, setAccSuccess] = useState('');
  const [accFailed, setAccFailed] = useState('');
  //update account details alert
  const [showAccSaved, setAccSaved] = useState(false);
  const [showAccNotSaved, setAccNotSaved] = useState(false);
  //business Category
  const [businessCategory, setBusinessCategory] = useState('');

  //check if pw and confirm pw is the same before updating pw
  const [confirmPW, setConfirmPW] = useState(false);
  const [showSuccessPW, setSuccessPW] = useState(false);
  //success/error message for pw update
  const [pwAlert, setPWAlert] = useState('');
  //show pw error alert
  const [showPW, setShowPW] = useState(false);

  //set acc disabled
  const mutateAccStatus = useMutation(
    (data) => api.post('/api/user/update-account-status', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', user?.id.toString()]);
      },
    }
  );

  const handleDisabled = async () => {
    mutateAccStatus.mutate({
      id: user?.id,
    });
    // close the modal once yes click.
    setShow(false);

    logout({ redirectTo: '/partner/login' });
  };

  const { register, handleSubmit } = useForm({
    defaultValues: { name: user?.name },
  });

  //update acc details

  const onChangeBizCategory = async (event) => {
    console.log(event.target.value);
    setBusinessCategory(event.target.value);
  };

  const mutateAccDetail = useMutation((data) =>
    api
      .post('/api/partner/update', data, {
        onSuccess: () => {
          console.log('3');
          queryClient.invalidateQueries(['user', user?.id.toString()]);
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setAccSaved(true);
          setAccSuccess(' Account details saved successfully! ');
          // document.getElementById("defaultBusinessCategory").reset();
        }
      })
      .catch((error) => {
        console.log(error);
        setAccFailed('An error has occured. Please try again.');
        setAccNotSaved(true);
      })
  );

  const onSubmit = async (data) => {
    console.log(businessCategory);
    if (
      user?.address != data.address ||
      user?.description != data.description ||
      user?.name != data.name ||
      user?.phonenumber != data.phonenumber ||
      user?.businessCategory != businessCategory ||
      fileUpload == true
    ) {
      mutateAccDetail.mutate({
        address: data.address,
        description: data.description,
        name: data.name,
        phonenumber: data.phonenumber,
        id: user?.id,
        businessCategory: businessCategory,
      });
    }
    if (fileUpload == true) {
      console.log('fileupload is true');
      submitFile();
    }
  };

  const handleFileChange = async (e) => {
    console.log('call handleFileChange');
    console.log(e);
    console.log(e.target.files[0].name);
    setFile(e.target.files[0]);
    setfileUpload(true);
    setFileName(e.target.files[0].name);
  };
  const submitFile = async () => {
    const data = new FormData();
    //if(file name is not empty..... handle condition when no file is selected)
    data.append('file', file);
    api
      .post('/api/uploadFile', data, {
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

  //change acc password

  const mutatePassword = useMutation((data) =>
    api
      .post('/api/user/change-password', data)
      .then((response) => {
        console.log('changed');
        setSuccessPW(true);
        setPWAlert('Your password has been updated successfully!');
        document.getElementById('change-password-form').reset();
      })
      .catch((error) => {
        console.log(error);
        setConfirmPW(false);
        setPWAlert('An error has occured.');
        setShowPW(true);
      })
  );

  const onSubmitPassword = async (data) => {
    setPWAlert('');
    setSuccessPW(false);
    setConfirmPW(false);
    setShowPW(false);
    validatePassword(data.oldPassword, data.newPassword, data.confirmPassword);
    if (confirmPW) {
      setShowPW(false);
      mutatePassword.mutate({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
    }
  };

  function validatePassword(oldPassword, newPassword, confirmPassword) {
    if (
      JSON.stringify(newPassword) === JSON.stringify(confirmPassword) &&
      JSON.stringify(oldPassword) != JSON.stringify(newPassword)
    ) {
      setConfirmPW(true);
    } else if (JSON.stringify(oldPassword) === JSON.stringify(newPassword)) {
      setPWAlert('Your current password is the same as the new password.');
      setShowPW(true);
    } else {
      setPWAlert('Passwords do not match.');
      setShowPW(true);
    }
  }

  return (
    // <LayoutOne>
    <PartnerWrapper title="Partner Home">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to disable your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDisabled}>
            Yes
          </Button>
          <Button className="btn btn-fill-out" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <BreadcrumbOne pageTitle="My Account">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">My Account Settings</li>
        </ol>
      </BreadcrumbOne>
      <div className="my-account-content space-pt--r60 space-pb--r60">
        <Container>
          <Tab.Container defaultActiveKey="accountDetails">
            <Row>
              <Col lg={3} md={4}>
                <Nav
                  variant="pills"
                  className="flex-column my-account-content__navigation space-mb--r60"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="accountDetails">
                      <IoIosPerson /> Account Details
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="changePassword">
                      <IoIosSettings /> Change Password
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="accountStatus">
                      <IoIosRadioButtonOn /> Account Status
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="payment">
                      <IoIosCash /> Payment
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col lg={9} md={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="payment">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>Payment Method</h3>
                      </Card.Header>
                      <Card.Body>
                        <p className="saved-message">
                          {"You Can't Saved Your Payment Method yet."}
                        </p>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="address">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>Billing Address</h3>
                      </Card.Header>
                      <Card.Body>
                        <address>
                          <p>
                            <strong>John Doe</strong>
                          </p>
                          <p>
                            1355 Market St, Suite 900 <br />
                            San Francisco, CA 94103
                          </p>
                          <p>Mobile: (123) 456-7890</p>
                        </address>
                        <a href="#" className="check-btn sqr-btn ">
                          <FaRegEdit /> Edit Address
                        </a>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="accountDetails">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>Account Details</h3>
                      </Card.Header>
                      <Card.Body>
                        <div className="account-details-form">
                          <label>Profile Picture</label>
                          <Row>
                            <Col className="form-group" xs={10} md={6}>
                              <Image
                                className="profile-image"
                                src={profilepicUrl}
                                thumbnail
                              />
                            </Col>
                          </Row>

                          <form
                            id="account-details-form"
                            onSubmit={handleSubmit(onSubmit)}
                          >
                            <Row>
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

                                  {/* <br></br>
                                  <div style={{display: (showUploadBtn?'block':'none')}}>
                                  <button
                                    className="btn btn-fill-out"
                                    onClick={submitFile}
                                  >
                                    Upload
                                  </button>
                                  </div> */}
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row>
                              <Col className="form-group" md={12}>
                                <label>
                                  Company Name{' '}
                                  <span className="required"></span>
                                </label>
                                <input
                                  required
                                  className="form-control"
                                  name="name"
                                  type="text"
                                  defaultValue={user?.name}
                                  ref={register()}
                                />
                              </Col>
                              <Col className="form-group" md={12}>
                                <Form.Group controlId="companyDesctextArea">
                                  <Form.Label>
                                    Description{' '}
                                    <span className="required"></span>
                                  </Form.Label>
                                  <Form.Control
                                    name="description"
                                    as="textarea"
                                    style={{ height: 120 }}
                                    defaultValue={user?.description}
                                    ref={register()}
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="form-group" md={12}>
                                <label>
                                  Email Address{' '}
                                  <span className="required"></span>
                                </label>
                                <input
                                  required
                                  className="form-control"
                                  name="email"
                                  type="email"
                                  defaultValue={user?.email}
                                  ref={register()}
                                  disabled={true}
                                />
                              </Col>
                              <Col className="form-group" md={12}>
                                <label>
                                  Phone Number (+65){' '}
                                  <span className="required"></span>
                                </label>
                                <input
                                  required
                                  className="form-control"
                                  name="phonenumber"
                                  type="tel"
                                  defaultValue={user?.phonenumber}
                                  ref={register()}
                                  placeholder="xxxxxxxx"
                                  pattern="[0-9]{8}"
                                  maxLength="8"
                                />
                              </Col>
                              <Col className="form-group" md={12}>
                                <Form.Group controlId="addresstextArea">
                                  <Form.Label>
                                    Address <span className="required"></span>
                                  </Form.Label>
                                  <Form.Control
                                    name="address"
                                    as="textarea"
                                    style={{ height: 120 }}
                                    defaultValue={user?.address}
                                    ref={register()}
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="form-group" md={12}>
                                {/* <FormControl isInvalid={errors.businesscategory}> */}
                                <Form.Label htmlFor="businesscategory">
                                  Business Category{' '}
                                  <span className="required"></span>
                                </Form.Label>

                                {(user?.businessCategory !== '' ||
                                  user?.businessCategory !== null) && (
                                  <p>
                                    {' '}
                                    Current Business Category :{' '}
                                    {user?.businessCategory}
                                  </p>
                                )}

                                <div className="form-group">
                                  <Form.Control
                                    name="businesscategory"
                                    as="select"
                                    onChange={onChangeBizCategory.bind(this)}
                                  >
                                    <option value="">Select</option>
                                    <option value="Automotive">
                                      Automotive
                                    </option>
                                    <option value="Business Support & Supplies">
                                      Business Support & Supplies
                                    </option>
                                    <option value="Computers & Electronics">
                                      Computers & Electronics
                                    </option>
                                    <option value="Construction & Contractor">
                                      Construction & Contractor
                                    </option>
                                    <option value="Education">Education</option>
                                    <option value="Entertainment">
                                      Entertainment
                                    </option>
                                    <option value="Food & Dining">
                                      Food & Dining
                                    </option>
                                    <option value="Health & Medicine">
                                      Health & Medicine
                                    </option>
                                    <option value="Home & Garden">
                                      Home & Garden
                                    </option>
                                    <option value="Legal & Financial">
                                      Legal & Financial{' '}
                                    </option>
                                    <option value="Manufacturing, Wholesale, Distribution">
                                      Manufacturing, Wholesale, Distribution
                                    </option>
                                    <option value="Merchants (Retail)">
                                      Merchants (Retail)
                                    </option>
                                    <option value="Personal Care & Services">
                                      Personal Care & Services
                                    </option>
                                    <option value="Real Estate">
                                      Real Estate
                                    </option>
                                    <option value="Travel & Transportation">
                                      Travel & Transportation
                                    </option>
                                  </Form.Control>

                                  {/* <FormErrorMessage>{errors.name && errors.email.name}</FormErrorMessage> */}
                                </div>
                                {/* </FormControl>; */}
                              </Col>
                              <Col md={12}>
                                <button
                                  type="submit"
                                  className="btn btn-fill-out"
                                  name="submit"
                                  value="Submit"
                                >
                                  Save
                                </button>
                              </Col>
                            </Row>
                            <div>&nbsp;</div>
                            <Alert
                              show={showAccSaved}
                              variant="success"
                              onClose={() => setAccSaved(false)}
                              dismissible
                            >
                              {accSuccess}
                            </Alert>

                            <Alert
                              show={showAccNotSaved}
                              variant="danger"
                              onClose={() => setAccNotSaved(false)}
                              dismissible
                            >
                              {accFailed}
                            </Alert>
                          </form>
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="changePassword">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>Change Password</h3>
                      </Card.Header>
                      <Card.Body>
                        <div className="change-password-form">
                          <form
                            id="change-password-form"
                            onSubmit={handleSubmit(onSubmitPassword)}
                          >
                            <Col className="form-group" md={12}>
                              <label>
                                Current Password{' '}
                                <span className="required"></span>
                              </label>
                              <input
                                required
                                className="form-control"
                                name="oldPassword"
                                type="password"
                                placeholder="Enter password"
                                ref={register()}
                              />
                            </Col>
                            <Col className="form-group" md={12}>
                              <label>
                                New Password <span className="required"></span>
                              </label>
                              <input
                                required
                                className="form-control"
                                name="newPassword"
                                type="password"
                                placeholder="Enter new password"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                ref={register()}
                              />
                            </Col>

                            <Col className="form-group" md={12}>
                              <label>
                                Confirm Password{' '}
                                <span className="required"></span>
                              </label>
                              <input
                                required
                                className="form-control"
                                name="confirmPassword"
                                type="password"
                                placeholder="Re-enter your new password"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                ref={register()}
                              />
                            </Col>

                            <Col md={12}>
                              <button
                                type="submit"
                                className="btn btn-fill-out"
                                name="submit"
                                value="Submit"
                              >
                                Save
                              </button>
                            </Col>
                          </form>
                          <div>&nbsp;</div>
                          <Alert
                            show={confirmPW && showSuccessPW}
                            variant="success"
                            onClose={() =>
                              setConfirmPW(false) && setSuccessPW(false)
                            }
                            dismissible
                          >
                            {pwAlert}
                          </Alert>
                          <Alert
                            show={!confirmPW && showPW}
                            onClose={() => setShowPW(false)}
                            variant="danger"
                            dismissible
                          >
                            {pwAlert}
                          </Alert>
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="accountStatus">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>Account Status</h3>
                      </Card.Header>
                      <Card.Body>
                        <p className="saved-message">
                          Your account is active now.<br></br>
                          <b className="noteMsg">Note</b>: Once you disabled
                          your account, you are unable to login or sign up with
                          the registered email. If you like to do so, please
                          contact us at{' '}
                          <a className="eventstopEmailText">
                            enquiry@eventstop.com
                          </a>
                        </p>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setShow(true)}
                        >
                          Disabled
                        </Button>{' '}
                        <Col md={12}></Col>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </PartnerWrapper>
    // </LayoutOne>
  );
};

export default MyAccount;
