import Link from 'next/link';
import { useState, useEffect } from 'react';
import { LayoutOne } from '../../layouts';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { Container, Row, Col } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
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
import { api2 } from '../../lib/ApiClient';
import { logout } from '../../lib/auth';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

const MyAccount = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showFailedMsg, setShowFailedMsg] = useState(false);
  //const [updateAccDetailStatus, setUpdateAccDetailStatus, ] = useState(false);
  //const [uploadSucess, setUploadSucess] = useState(false);
  const [fileUpload, setfileUpload] = useState(false);
  const [file, setFile] = useState('uploadfile');

  const { data: user } = useUser(localStorage.getItem('userId'));
  //const profiepicSrcUrl = user?.profilePic;
  const [profilepicUrl, setProfilepicUrl] = useState(user?.profilePic);
  // display the inital profile picture
  useEffect(() => {
    setProfilepicUrl(user?.profilePic);
  }, [user?.profilePic]);

  const mutateAccStatus = useMutation(
    (data) => api.post('/api/user/update-account-status', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', user?.id.toString()]);
      },
    }
  );

  const handleDisabled = async (data) => {
    mutateAccStatus.mutate({
      id: user?.id,
    });
    // close the modal once yes click.
    setShow(false);

    logout({ redirectTo: '/organiser/login' });
  };

  const queryClient = useQueryClient();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { name: user?.name },
  });

  const mutateAccDetail = useMutation((data) =>
    api
      .post('/api/user/update', data, {
        onSuccess: () => {
          queryClient.invalidateQueries(['user', user?.id.toString()]);
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          // show update sucess message
          setShowSuccessMsg(true);
        }
      })
      .catch((error) => {
        console.log(error);
        // show error message
        setShowFailedMsg(true);
      })
  );

  const mutatePassword = useMutation(
    (data) => api.post('/api/user/change-password', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', user?.id.toString()]);
      },
    }
  );

  const onSubmit = async (data) => {
    console.log('data acc' + data['name']);
    if (
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
      });
    }
    if (fileUpload == true) {
      console.log('fileupload is true');
      submitFile();
    }
  };

  const onSubmitPassword = async (data) => {
    console.log('call change password' + data['newPassword']);

    mutatePassword.mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
    // console.log(data);
  };

  const handleFileChange = async (e) => {
    console.log('call handleFileChange');
    console.log(e);
    setFile(e.target.files[0]);
    setfileUpload(true);
  };
  const submitFile = async () => {
    const data = new FormData();
    //if(file name is not empty..... handle condition when no file is selected)
    data.append('file', file);
    api2
      .post('/api/uploadFile', data, {
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
      .catch((error) => {
        setShowFailedMsg(true);
      });
  };

  return (
    <LayoutOne>
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
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle="My Account">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">My Account</li>
        </ol>
      </BreadcrumbOne>
      <div className="my-account-content space-pt--r100 space-pb--r100">
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
                          You Can't Saved Your Payment Method yet.
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
                    <div
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
                    </div>
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
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                              <Col className="form-group" md={12}>
                                <Form.Group>
                                  <Form.File
                                    id="custom-file"
                                    type="file"
                                    onChange={handleFileChange}
                                  ></Form.File>

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
                                  Phone Number{' '}
                                  <span className="required"></span>
                                </label>
                                <input
                                  required
                                  className="form-control"
                                  name="phonenumber"
                                  type="number"
                                  defaultValue={user?.phonenumber}
                                  ref={register()}
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
                        <div className="account-details-form">
                          <form onSubmit={handleSubmit(onSubmitPassword)}>
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
                                ref={register()}
                              />
                            </Col>
                            {/*
                            <Col className="form-group" md={12}>
                              <label>
                                Confirm Password{' '}
                                <span className="required">*</span>
                              </label>
                              <input
                                required
                                className="form-control"
                                type="password"
                              />
                            </Col>
                           */}
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
    </LayoutOne>
  );
};

export default MyAccount;
