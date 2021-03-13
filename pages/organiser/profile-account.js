import Link from 'next/link';
import { useState, useEffect } from 'react';
// import { LayoutOne } from '../../layouts';
import { BreadcrumbOne } from '../../components/Breadcrumb';
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
import OrganiserWrapper from '../../components/wrapper/OrganiserWrapper';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import ButtonWithLoading from '../../components/custom/ButtonWithLoading';
import { getUser } from '../../lib/query/getUser';

//test
import {
  IoIosCash,
  IoIosPerson,
  IoIosSettings,
  IoIosRadioButtonOn,
  IoIosDocument,
} from 'react-icons/io';

import { useForm } from 'react-hook-form';
import useUser from '../../lib/query/useUser';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import api from '../../lib/ApiClient';
import { logout } from '../../lib/auth';

const MyAccount = () => {
  // if multiple file, we ask them to zip
  const [bizDocInputName, setBizDocInputName] = useState('Choose file');
  const [bizDocfile, setBizDocfile] = useState(null);
  const [proficpicfile, setProfilePicFile] = useState('uploadprofilepicfile');

  const [fileName, setFileName] = useState('Choose image');
  const [loginLoading, setLoginLoading] = useState(false);
  const [user, setUser] = useState();
  //const { data: user } = useUser(localStorage.getItem('userId'));
  const [profilepicUrl, setProfilepicUrl] = useState(null);

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
  //show successful upload of file alert
  const [showSucessBizUpload, setShowSucessBizUpload] = useState(false);
  const [showErrorBizUpload, setShowErrorBizUpload] = useState(false);
  const [bizDocErrorMessage, setBizDocErrorMessage] = useState('');
  const [ispicupdated, setIspicupdated] = useState(false);

  useEffect(() => {
    console.log('use effect');
    const getUserData = async () => {
      await getUser(localStorage.getItem('userId')).then((data) => {
        setUser(data);
      });
    };
    getUserData();

    setBizDocInputName('Choose file');
  }, []);
  const uploadbiz = useMutation((data) => {
    console.log(data);
    var form_data = new FormData();
    form_data.append('id', data['id']);
    form_data.append('bizSupportDoc', bizDocfile);

    api
      .post('/api/organiser/uploadbizdoc', form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setFileName('Choose File');
          setLoginLoading(false);
          document.getElementById('biz-upload-custom-file').value = '';
          //the message that is return
          if (response.data['fileDownloadUri'] == 'success') {
            setShowSucessBizUpload(true);
            setShowErrorBizUpload(false);
          } else {
            setBizDocErrorMessage('An error has occured');
            setShowSucessBizUpload(false);
            setShowErrorBizUpload(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // upload biz document
  const handleBizDocFileChange = async (e) => {
    if (e.target.files[0] == undefined) {
      setBizDocInputName('Choose file');
    } else if (e.target.files[0].size / 1000000 > 5) {
      // if size is more than 5mb, display error message
      console.log('exceeded');

      setBizDocErrorMessage('The zip file size must be less than 5 mb.');
      setShowErrorBizUpload(true);
      setShowSucessBizUpload(false);
      document.getElementById('biz-upload-custom-file').value = '';
    } else {
      setShowErrorBizUpload(false);
      setBizDocfile(e.target.files[0]);
      setBizDocInputName(e.target.files[0].name);
    }
  };

  const onSubmitBizDoc = async (data) => {
    setLoginLoading(true);
    uploadbiz.mutate({
      id: user?.id,
    });
  };

  const mutateAccStatus = useMutation(
    (data) => api.post(`/api/user/disableStatus/${user?.id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', user?.id.toString()]);
        logout({ redirectTo: '/organiser/login' });
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

  const mutateAccDetail = useMutation((data) => {
    var form_data = new FormData();
    form_data.append('address', data['address']);
    form_data.append('description', data['description']);
    form_data.append('name', data['name']);
    form_data.append('phonenumber', data['phonenumber']);
    if (fileName !== 'Choose image') {
      form_data.append('profilepicfile', proficpicfile);
    } else {
      form_data.append('profilepicfile', null);
    }

    form_data.append('id', data['id']);

    api
      .post('/api/organiser/updateEoProfile', form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('update profile response');
        console.log(response);
        console.log(response.data['fileDownloadUri']);
        setProfilepicUrl(response.data['fileDownloadUri']);
        setIspicupdated(true);
        setAccSaved(true);
        setAccSuccess(' Account details saved successfully! ');
        setLoginLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const onSubmit = async (data) => {
    setLoginLoading(true);
    setAccSaved(false);
    mutateAccDetail.mutate({
      address: data.address,
      description: data.description,
      name: data.name,
      phonenumber: data.phonenumber,
      id: user?.id,
    });
  };

  // update profile pic
  const handleFileChange = async (e) => {
    if (e.target.files[0] == undefined) {
      setFileName('Choose image');
    } else if (e.target.files[0].size / 1000000 > 1) {
      console.log('exceeded');
      setShowFileSizeError(true);
      document.getElementById('custom-file').value = '';
    } else {
      setShowFileSizeError(false);
      setProfilePicFile(e.target.files[0]);
      //setfileUpload(true);
      setFileName(e.target.files[0].name);
    }
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
      .then((response) => {})
      .catch((error) => {})
  );

  const onSubmitPassword = async (data) => {
    console.log('onsubmit password1');
    setPWAlert('');
    setShowPW(false);
    setConfirmPW(false);
    setLoginLoading(true);

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
      setLoginLoading(false);
    } else if (result == 'incorrect') {
      setPWAlert('Passwords do not match.');
      setShowPW(true);
      setLoginLoading(false);
    }
  };

  const onSubmitNotification = async (data) => {};

  function validatePassword(oldPassword, newPassword, confirmPassword) {
    if (
      JSON.stringify(newPassword) === JSON.stringify(confirmPassword) &&
      JSON.stringify(oldPassword) != JSON.stringify(newPassword)
    ) {
      return 'correct';
    } else if (JSON.stringify(oldPassword) === JSON.stringify(newPassword)) {
      return 'same as current';
    } else {
      return 'incorrect';
    }
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Support png and jpg image format.
    </Tooltip>
  );

  // upload biz document section

  const renderTooltipBizDoc = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Please upload business verification document(s) as a zip file.
    </Tooltip>
  );

  return (
    // <LayoutOne>
    <OrganiserWrapper title="Organiser Home">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to disable your account?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-fill-out btn" onClick={handleDisabled}>
            Yes
          </button>
          <Button variant="secondary" onClick={handleClose}>
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
                    <Nav.Link eventKey="uploadBizDoc">
                      <IoIosDocument /> Business Verification
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="notification">
                      <IoIosCash /> Notification
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
                  <Tab.Pane eventKey="uploadBizDoc">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3> Upload Business Verification Document</h3>
                      </Card.Header>
                      <Card.Body>
                        <div className="account-details-form">
                          <form
                            id="uploadbizForm"
                            onSubmit={handleSubmit(onSubmitBizDoc)}
                          >
                            <div
                              style={{
                                display: showSucessBizUpload ? 'block' : 'none',
                              }}
                            >
                              {
                                <Alert
                                  show={showSucessBizUpload}
                                  variant="success"
                                  onClose={() => setShowSucessBizUpload(false)}
                                  dismissible
                                >
                                  {' '}
                                  Document uploaded sucessfully! We will email
                                  you the outcome once the document is verified{' '}
                                </Alert>
                              }
                            </div>
                            <div
                              style={{
                                display: showErrorBizUpload ? 'block' : 'none',
                              }}
                            >
                              {
                                <Alert
                                  show={showErrorBizUpload}
                                  variant="danger"
                                  onClose={() => setShowErrorBizUpload(false)}
                                  dismissible
                                >
                                  {' '}
                                  {bizDocErrorMessage}{' '}
                                </Alert>
                              }
                            </div>

                            <div className="form-group col-md-12">
                              {user?.approved == false &&
                                user?.approvalMessage == null &&
                                user?.supportDocsUrl != null && (
                                  <h6>
                                    Verification Status:{' '}
                                    <span className="noteMsg">Pending</span>
                                  </h6>
                                )}
                            </div>
                            <div className="form-group col-md-12">
                              {user?.supportDocsUrl == null && (
                                <h6>
                                  Verification Status:{' '}
                                  <span className="noteMsg">No Submission</span>
                                </h6>
                              )}
                            </div>
                            <div className="form-group col-md-12">
                              {user?.approved == false &&
                                user?.approvalMessage != null &&
                                user?.supportDocsUrl != null && (
                                  <h6>
                                    Verification Status:{' '}
                                    <span className="noteMsg">Rejected</span>
                                  </h6>
                                )}
                            </div>
                            <div className="form-group col-md-12">
                              {user?.approved == true && (
                                <h6>
                                  Verification Status:
                                  <span className="greenMsg">Approved</span>
                                </h6>
                              )}
                            </div>

                            <Form.Label className="uploadFileLabel">
                              Business Verification Document &nbsp;
                              <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipBizDoc}
                              >
                                <BsFillInfoCircleFill></BsFillInfoCircleFill>
                              </OverlayTrigger>
                            </Form.Label>

                            <Col className="form-group" md={12}>
                              <Form.Group>
                                <Form.File
                                  id="biz-upload-custom-file"
                                  type="file"
                                  accept=".zip"
                                  onChange={handleBizDocFileChange}
                                  required
                                  custom
                                />
                                <Form.Label
                                  className="form-group custom-file-label"
                                  md={12}
                                  for="custom-file"
                                >
                                  {bizDocInputName}
                                </Form.Label>

                                <div>
                                  <br></br>
                                  <p className="saved-message">
                                    <b className="noteMsg">Note</b>
                                    <br></br>
                                    <b className="noteMsg">*</b>You need to
                                    upload document(s) to verify your business
                                    before you can create any events on
                                    EventStop.
                                    <br></br>
                                    <b className="noteMsg">*</b> If your
                                    previous submission is incomplete, you can
                                    zip and re-upload all the verfication
                                    document(s).
                                  </p>
                                </div>

                                <br></br>
                                {user?.approved != true && (
                                  <ButtonWithLoading
                                    type="submit"
                                    className="btn btn-fill-out"
                                    name="submit"
                                    isLoading={loginLoading}
                                  >
                                    Upload
                                  </ButtonWithLoading>
                                )}
                              </Form.Group>
                            </Col>
                          </form>
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
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
                          <div
                            style={{
                              display: showFileSizeError ? 'block' : 'none',
                            }}
                          >
                            {
                              <Alert
                                show={showFileSizeError}
                                variant="danger"
                                onClose={() => setShowFileSizeError(false)}
                                dismissible
                              >
                                {' '}
                                The image size must be less than 3 mb.{' '}
                              </Alert>
                            }
                          </div>

                          <Alert
                            show={showAccSaved}
                            variant="success"
                            onClose={() => setAccSaved(false)}
                            dismissible
                          >
                            {accSuccess}
                            <Link
                              href={{
                                pathname: '/organiser/organiser-profile',
                                query: { paraId: JSON.stringify(user?.id) },
                              }}
                            >
                              <a>
                                <span>View Profile</span>
                              </a>
                            </Link>
                          </Alert>

                          <form
                            id="account-details-form"
                            onSubmit={handleSubmit(onSubmit)}
                          >
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
                                {user?.profilePic != null &&
                                  profilepicUrl == null && (
                                    <Image
                                      className="profile-image"
                                      src={user?.profilePic}
                                      thumbnail
                                    />
                                  )}

                                {user?.profilePic == null &&
                                  ispicupdated == false && (
                                    <Image
                                      className="profile-image"
                                      src="../../assets/images/defaultprofilepic.png"
                                      thumbnail
                                    />
                                  )}
                                {profilepicUrl != null &&
                                  ispicupdated == true && (
                                    <Image
                                      className="profile-image"
                                      src={profilepicUrl}
                                      thumbnail
                                    />
                                  )}
                              </Col>
                            </Row>

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
                              </Col>
                            </Row>

                            <Row>
                              <Col className="form-group" md={12}>
                                <label>
                                  Company Name{' '}
                                  <span className="required">*</span>
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
                                  <span className="required">*</span>
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
                                  <span className="required">*</span>
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
                            <Col className="form-group" md={12}>
                              <label>
                                Current Password{' '}
                                <span className="required">*</span>
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
                                New Password <span className="required">*</span>
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
                                <span className="required">*</span>
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
                              <ButtonWithLoading
                                type="submit"
                                className="btn btn-fill-out"
                                name="submit"
                                value="Submit"
                                isLoading={loginLoading}
                              >
                                Save
                              </ButtonWithLoading>
                              {/* <button
                                type="submit"
                                className="btn btn-fill-out"
                                name="submit"
                                value="Submit"
                              >
                                Save
                              </button> */}
                            </Col>
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
                        <div className="account-details-form">
                          <p className="saved-message">
                            Your account is active now.<br></br>
                            <b className="noteMsg">Note</b>: Once you disabled
                            your account, you are unable to login or sign up
                            with the registered email. If you like to do so,
                            please contact us at{' '}
                            <a className="eventstopEmailText">
                              enquiry@eventstop.com
                            </a>
                          </p>
                          <button
                            className="btn btn-fill-out btn"
                            size="sm"
                            onClick={() => setShow(true)}
                          >
                            Disabled
                          </button>{' '}
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </OrganiserWrapper>
    // </LayoutOne>
  );
};

export default MyAccount;
