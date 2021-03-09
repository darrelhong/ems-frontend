import Link from 'next/link';
import { useState, useEffect } from 'react';
// import { LayoutOne } from '../../layouts';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import ButtonWithLoading from '../../components/custom/ButtonWithLoading';
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
import { FaRegEdit } from 'react-icons/fa';
import PartnerWrapper from '../../components/wrapper/PartnerWrapper';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { AiOutlineNotification } from 'react-icons/ai';
import {
  IoIosCash,
  IoIosPerson,
  IoIosSettings,
  IoIosRadioButtonOn,
} from 'react-icons/io';

import { useForm } from 'react-hook-form';
import useUser from '../../lib/query/useUser';
import { useMutation, useQueryClient } from 'react-query';
import api from '../../lib/ApiClient';
import { logout } from '../../lib/auth';

const MyAccount = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showFailedMsg, setShowFailedMsg] = useState(false);
  const [businessCategory, setBusinessCategory] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [fileUpload, setfileUpload] = useState(false);
  const [file, setFile] = useState('uploadfile');

  const [fileName, setFileName] = useState('Choose image');

  const { data: user } = useUser(localStorage.getItem('userId'));
  //const profiepicSrcUrl = user?.profilePic;
  const [profilepicUrl, setProfilepicUrl] = useState(
    '../../public/assets/images/defaultprofilepic.png'
  );
  // display the inital profile picture
  //console.log(user?.profilePic);
  if (user?.profilePic != null) {
    useEffect(() => {
      setProfilepicUrl(user?.profilePic);
    }, [user?.profilePic]);
  } else {
    useEffect(() => {
      setProfilepicUrl('../../assets/images/defaultprofilepic.png');
    }, ['../../assets/images/defaultprofilepic.png']);
  }

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
  //update account details alert
  const [showAccSaved, setAccSaved] = useState(false);

  //check if pw and confirm pw is the same before updating pw
  const [confirmPW, setConfirmPW] = useState(false);
  //success/error message for pw update
  const [pwAlert, setPWAlert] = useState('');
  //show pw error alert
  const [showPW, setShowPW] = useState(false);
  const [showFileSizeError, setShowFileSizeError] = useState(false);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Support png and jpg image format.
    </Tooltip>
  );

  const mutateAccStatus = useMutation(
    (data) => api.post(`/api/user/disableStatus/${user?.id}`),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', user?.id.toString()]);
        logout({ redirectTo: '/partner/login' });
      },
    }
  );

  const handleDisabled = async () => {
    mutateAccStatus.mutate({
      id: user?.id,
    });
    // close the modal once yes click.
    setShow(false);
  };

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { name: user?.name },
  });

  const mutateAccDetail = useMutation((data) =>
    api
      .post('/api/partner/update', data)
      .then((response) => {
        setAccSaved(true);
        setAccSuccess(' Account details saved successfully! ');
        setLoginLoading(false);
        //document.getElementById("account-details-form").reset();
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      })
  );

  const onChangeBizCategory = async (event) => {
    console.log('change' + event.target.value);
    setBusinessCategory(event.target.value);
  };

  const onSubmit = async (data) => {
    console.log('data acc' + data['name']);

    setLoginLoading(true);
    if (businessCategory != '') {
      mutateAccDetail.mutate({
        address: data.address,
        description: data.description,
        name: data.name,
        phonenumber: data.phonenumber,
        id: user?.id,
        businessCategory: businessCategory,
      });
    } else if (
      user?.address != data.address ||
      user?.description != data.description ||
      user?.name != data.name ||
      user?.phonenumber != data.phonenumber ||
      fileUpload == true
    ) {
      mutateAccDetail.mutate({
        address: data.address,
        description: data.description,
        name: data.name,
        phonenumber: data.phonenumber,
        id: user?.id,
        businessCategory: user?.businessCategory,
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
    console.log(e.target.files[0].size);
    console.log(e.target.files[0].size / 1000000);

    if (e.target.files[0].size / 1000000 > 1 || e.target.files[0].name == '') {
      console.log('exceeded');
      setShowFileSizeError(true);
      document.getElementById('custom-file').value = '';
    } else {
      setShowFileSizeError(false);
      setFile(e.target.files[0]);
      setfileUpload(true);
      setFileName(e.target.files[0].name);
    }
  };
  const submitFile = async () => {
    const data = new FormData();
    //if(file name is not empty..... handle condition when no file is selected)
    data.append('file', file);
    api
      .post('/api/uploadProfilePicFile', data, {
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

  const mutatePassword = useMutation((data) => {
    api
      .post('/api/user/change-password', data, {})
      .then((response) => {
        console.log(response.data['message']);
        if (response.data['message'] == 'Success') {
          document.getElementById('change-password-form').reset();
          setPWAlert('Your password has been updated successfully!');

          setConfirmPW(true);
          // setShowPW(true);
          setLoginLoading(false);
        } else if (response.data['message'] == 'Old password is incorrect.') {
          setPWAlert('Current password is incorrect.');
          setShowPW(true);
          setLoginLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);

        setPWAlert('An error has occured.');
        setShowPW(true);
        setLoginLoading(false);
      });
  });

  const mutateNotificationSetting = useMutation((data) =>
    api
      .post('/api/user/update-notifcation-setting', data)
      .then((response) => { })
      .catch((error) => { })
  );

  const onSubmitPassword = async (data) => {
    console.log('onsubmit password1');
    setPWAlert('');
    setShowPW(false);
    setConfirmPW(false);

    var result = validatePassword(
      data.oldPassword,
      data.newPassword,
      data.confirmPassword
    );
    console.log('result');
    console.log(result);

    if (result == 'correct') {
      //setConfirmPW(true);
      //setShowPW(false);
      console.log('onsubmit password2');
      mutatePassword.mutate({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
    } else if (result == 'same as current') {
      setPWAlert('Your current password is the same as the new password.');
      setShowPW(true);
    } else if (result == 'incorrect') {
      setPWAlert('Passwords do not match.');
      setShowPW(true);
    }
  };

  const onSubmitNotification = async (data) => { };

  function validatePassword(oldPassword, newPassword, confirmPassword) {
    if (
      JSON.stringify(newPassword) === JSON.stringify(confirmPassword) &&
      JSON.stringify(oldPassword) != JSON.stringify(newPassword)
    ) {
      // setConfirmPW(true);
      return 'correct';
    } else if (JSON.stringify(oldPassword) === JSON.stringify(newPassword)) {
      return 'same as current';
      // setPWAlert("Your current password is the same as the new password.");
      //setShowPW(true);
    } else {
      return 'incorrect';
      //setPWAlert("Passwords do not match.");
      //setShowPW(true);
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
           No
          </Button>
          <button className="btn btn-fill-out" onClick={handleClose}>
          Yes
          </button>
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
                    <Nav.Link eventKey="notification">
                      <AiOutlineNotification /> Notification
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
                    {/* <div
                      style={{
                        display: showSuccessMsg ? 'block' : 'none',
                      }}
                    >
                      <Alert variant="success">Update Sucessfully</Alert>
                    </div>
                    <div
                      style={{
                        display: showFailedMsg ? 'block' : 'none',
                      }}
                    >
                      <Alert variant="danger">Error Occured</Alert>
                    </div>*/}
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>Account Details</h3>
                      </Card.Header>
                      <Card.Body>
                        <div className="account-details-form">
                          <label>
                            Profile Picture &nbsp;
                            <OverlayTrigger
                              placement="right"
                              delay={{ show: 250, hide: 400 }}
                              overlay={renderTooltip}
                            >
                              <BsFillInfoCircleFill></BsFillInfoCircleFill>
                            </OverlayTrigger>
                          </label>
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
                                    accept=".png,.jpg"
                                  />
                                  <Form.Label
                                    className="form-group custom-file-label"
                                    md={12}
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

                                <div
                                  style={{
                                    display: showFileSizeError
                                      ? 'block'
                                      : 'none',
                                  }}
                                >
                                  {
                                    <Alert
                                      show={showFileSizeError}
                                      variant="danger"
                                      onClose={() =>
                                        setShowFileSizeError(false)
                                      }
                                      dismissible
                                    >
                                      {' '}
                                      The image size must be less than 3 mb.{' '}
                                    </Alert>
                                  }
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col className="form-group" md={12}>
                                <label>
                                  Company Name *{' '}
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
                                {/* <FormControl isInvalid={errors.businesscategory}> */}
                                <Form.Label htmlFor="businesscategory">
                                  Business Category *{' '}
                                  <span className="required"></span>
                                </Form.Label>

                                {/* {(user?.businessCategory !== "" )&& (
                             <p> Current Business Category : { user?.businessCategory}</p>
                           )} */}

                                <div className="form-group">
                                  <Form.Control
                                    name="businesscategory"
                                    defaultValue={user?.businessCategory}
                                    as="select"
                                    onChange={onChangeBizCategory.bind(this)}
                                  >
                                    {(user?.businessCategory == '' ||
                                      user?.businessCategory == null) && (
                                        <option value="">Select</option>
                                      )}
                                    {user?.businessCategory !== '' && (
                                      <option value={user?.businessCategory}>
                                        {user?.businessCategory}
                                      </option>
                                    )}

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
                                </div>
                              </Col>

                              <Col className="form-group" md={12}>
                                <label>
                                  Email Address *{' '}
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
                                  Phone Number *(+65){' '}
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

                              <Col md={12}>
                                <ButtonWithLoading
                                  type="submit"
                                  className="btn btn-fill-out"
                                  name="submit"
                                  value="Submit"
                                  isLoading={loginLoading}
                                >
                                  Save
                                </ButtonWithLoading>
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
                          </form>
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="notification">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>Notification Settings</h3>
                      </Card.Header>
                      <Card.Body>
                        <div className="account-details-form">
                          {/* <form
                            id="notifcation-setting-form"
                            onSubmit={handleSubmit(onSubmitNotification)}
                          >
                            <Col className="form-group" md={12}>
                              <Form>
                                {['checkbox'].map((type) => (
                                  <div key={`default-${type}`} className="mb-3">
                                    <Form.Check
                                      type={type}
                                      id={`default-${type}`}
                                      label={'Receive updates for upcoming events [need discuss eo receive what?]'}
                                    />

                                    <Form.Check
                                      type={type}
                                      id={`default-${type}`}
                                      label={`default ${type}`}
                                    />
                                  </div>
                                ))}
                              </Form>
                            </Col>

                            <Col>
                              <button
                                type="submit"
                                className="btn btn-fill-out"
                                name="submit"
                                value="Submit"
                              >
                                Save
                              </button>
                            </Col>
                          </form> */}
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
                        <div className="account-details-form">
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


                            <Col>
                              <button
                                type="submit"
                                className="btn btn-fill-out"
                                name="submit"
                                value="Submit"
                              >
                                Save
                              </button>
                            </Col>

                            <div>&nbsp;</div>
                            <Alert
                              show={confirmPW}
                              variant="success"
                              onClose={() => setConfirmPW(false)}
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
                          </form>
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
                        {/* <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setShow(true)}
                        >
                          Disable
                        </Button>{' '} */}
                        <button
                          
                          className="btn btn-fill-out btn-sm"
                          name="disable"
                          onClick={() => setShow(true)}
                        >
                          Disable
                                                    </button>
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