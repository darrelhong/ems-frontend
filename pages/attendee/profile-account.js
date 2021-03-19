import Link from 'next/link';
import { useState, useEffect } from 'react';
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
import AttendeeWrapper from '../../components/wrapper/AttendeeWrapper';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { AiOutlineNotification } from 'react-icons/ai';
import Badge from 'react-bootstrap/Badge';

import {
  IoIosCash,
  IoIosPerson,
  IoIosSettings,
  IoIosRadioButtonOn,
  IoIosContacts
} from 'react-icons/io';

import { useForm } from 'react-hook-form';
import useUser from '../../lib/query/useUser';
import {getFollowingEo, getFollowingBp} from '../../lib/query/getAttendeeFollowing';

import { useMutation, useQueryClient } from 'react-query';
import api from '../../lib/ApiClient';
import { logout } from '../../lib/auth';

export default function MyAccount() {
  const [setShowFailedMsg] = useState(false);
  var categoryPreferences = [];

  const [fileUpload, setfileUpload] = useState(false);
  const [file, setFile] = useState('uploadfile');

  const [fileName, setFileName] = useState('Choose image');

  const { data: user } = useUser(localStorage.getItem('userId'));
  const [profilepicUrl, setProfilepicUrl] = useState(
    '../../public/assets/images/defaultprofilepic.png'
  );
  useEffect(() => {
    if (user?.profilePic) {
      setProfilepicUrl(user.profilePic);
    } else {
      setProfilepicUrl('../../assets/images/defaultprofilepic.png');
    }
  }, [user?.profilePic]);

  useEffect(() => {
    setFileName('Choose image');
  }, []);

  //for modal of disabling account
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
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
  const[followingBp, setFollowingBp] = useState([]);
  const[followingEo, setFollowingEo] = useState([]);

  useEffect(() => {
    const getFollowingPartner = async () => {
      await getFollowingBp(localStorage.getItem('userId')).then((data) => {
        setFollowingBp(data);
      });
    };
    getFollowingPartner();

    const getFollowingOrganiser = async () => {
      await getFollowingEo(localStorage.getItem('userId')).then((data) => {
        setFollowingEo(data);
      });
    };
    getFollowingOrganiser();
  }, []);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Support png and jpg image format.
    </Tooltip>
  );

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

    logout({ redirectTo: '/attendee/login' });
  };

  const { register, handleSubmit } = useForm({
    defaultValues: { name: user?.name },
  });

  const mutateAccDetail = useMutation((data) =>
    api
      .post('/api/attendee/update', data)
      .then(() => {
        setAccSaved(true);
        setAccSuccess(' Account details saved successfully! ');
        //document.getElementById("account-details-form").reset();
      })
      .catch((error) => {
        console.log(error);
      })
  );

  const toggleCategoryPreference = async (event) => {
    if (event.target.checked) {
      console.log('add ' + event.target.id);

      categoryPreferences.push(event.target.id);
    } else {
      console.log('remove ' + event.target.id);

      let removeIndex = categoryPreferences.indexOf(event.target.id);
      categoryPreferences.splice(removeIndex, 1);
    }
    console.log(categoryPreferences);
  };
  const onSubmit = async (data) => {
    console.log('data acc' + data['name']);
    if (compareArrays(user?.categoryPreferences, categoryPreferences)) {
      mutateAccDetail.mutate({
        address: data.address,
        description: data.description,
        name: data.name,
        phonenumber: data.phonenumber,
        id: user?.id,
        categoryPreferences: categoryPreferences,
      });
      user.categoryPreferences = categoryPreferences;
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
        categoryPreferences: user?.categoryPreferences,
      });
    }
    if (fileUpload == true) {
      submitFile();
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files[0].size / 1000000 > 1 || e.target.files[0].name == '') {
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
        if (response.status == 200) {
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
        if (response.data['message'] == 'Success') {
          document.getElementById('change-password-form').reset();
          setPWAlert('Your password has been updated successfully!');

          setConfirmPW(true);
          setShowPW(true);
        } else if (response.data['message'] == 'Old password is incorrect.') {
          setPWAlert('Old password is incorrect.');
          setShowPW(true);
        }
      })
      .catch((error) => {
        console.log(error);

        setPWAlert('An error has occured.');
        setShowPW(true);
      });
  });

  const onSubmitPassword = async (data) => {
    setPWAlert('');
    setShowPW(false);
    setConfirmPW(false);

    var result = validatePassword(
      data.oldPassword,
      data.newPassword,
      data.confirmPassword
    );
    if (result == 'correct') {
      //setConfirmPW(true);
      //setShowPW(false);
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

  function compareArrays(arr1, arr2) {
    if (arr1.length != arr2.length) {
      return false;
    }
    for (var i = 0; i < arr1.length; i++) {
      if (!arr2.find((e) => e == arr1[i])) {
        return false;
      }
    }
    console.log('arrays are the same');
    return true;
  }

  return (
    // <LayoutOne>
    <AttendeeWrapper title="Attendee Home">
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
                    <Nav.Link eventKey="following">
                      <IoIosContacts /> Following
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
                  <Tab.Pane eventKey="following">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>List of Following</h3>
                      </Card.Header>
                      <Card.Body>
                      <Container>
          <Tab.Container defaultActiveKey="organiser">
            <Nav
              variant="pills"
              className="product-tab-navigation text-center justify-content-center space-mb--30"
            >
              <Nav.Item>
                <Nav.Link eventKey="organiser">Event Organiser</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="partners">Partner</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="organiser">
                <Row>
                  <Col md={12}>
                    <div
                      style={{
                        overflowY: 'auto',
                        // border:'1px solid red',
                        // width:'500px',
                        overflowX: 'hidden',
                        height: '40vh',
                        position: 'relative',
                      }}
                    >
                      <div className="product-description-tab__additional-info">
                        {followingEo != null &&
                          followingEo.map((follow) => {
                            return (
                              <li>
                              <hr></hr>
                              <Row>
                                <Col md="1" xs="1">
                                  {' '}
                                  &nbsp;
                                </Col>
                                <Col md="2" xs="2">
                                  <div className="avatar">
                                    {follow?.profilePic == null && (
                                      <img
                                        src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                        className="img-circle img-no-padding img-responsive"
                                      />
                                    )}
                                    {follow?.profilePic != null && (
                                      <Image
                                        className="img-circle img-no-padding img-responsive"
                                        src={follow?.profilePic}
                                      />
                                    )}
                                  </div>
                                </Col>
                                <Col md="5" xs="5">
                                  {/* <br></br> */}
                                  <Link
                                    href={{
                                      pathname:
                                        '/organiser/organiser-profile',
                                      query: {
                                        paraId: JSON.stringify(follow?.id),
                                      },
                                    }}
                                  >
                                    {follow.name}
                                  </Link>{' '}
                                  <br />
                                  {/* <span className="text-muted">
                                    {follow.email}
                                  </span> */}
                                  <div>
                                    <span className="text-muted">
                                      {follow.description != null && follow.description}
                                      {follow.description == null && "There is no description yet."}
                                    </span>
                                  </div>
                                </Col>

                                <Col className="text-left" md="4" xs="4">
                                  <span>Email:</span>
                                  <br></br>
                                  <span className="text-muted">
                                    {follow.email}
                                  </span>
                                  {/* {!publicView && (
                                    <Button
                                      className="btn-round btn-icon"
                                      color="success"
                                      outline
                                      size="sm"
                                    >
                                      Select
                                    </Button>
                                  )} */}
                                </Col>
                              </Row>
                            </li>
                            );
                          })}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="partners">
                <Row>
                  <Col md={12}>
                    <div
                      style={{
                        overflowY: 'auto',
                        // border:'1px solid red',
                        // width:'500px',
                        overflowX: 'hidden',
                        height: '40vh',
                        position: 'relative',
                      }}
                    >
                      <div className="product-description-tab__additional-info">
                        <ul className="list-unstyled team-members">
                          {followingBp != null &&
                            followingBp.map((partner) => {
                              return (
                                <li>
                                  <hr></hr>
                                  <Row>
                                    <Col md="1" xs="1">
                                      {' '}
                                      &nbsp;
                                    </Col>
                                    <Col md="2" xs="2">
                                      <div className="avatar">
                                        {/* <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                            /> */}
                                        {partner?.profilePic == null && (
                                          <img
                                            src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                            className="img-circle img-no-padding img-responsive"
                                          />
                                        )}
                                        {partner?.profilePic != null && (
                                          <Image
                                            className="img-circle img-no-padding img-responsive"
                                            src={partner?.profilePic}
                                          />
                                        )}
                                      </div>
                                    </Col>
                                    <Col md="4" xs="4">
                                      {/* <br></br> */}
                                      <Link
                                        href={{
                                          pathname: '/partner/partner-profile',
                                          query: {
                                            paraId: JSON.stringify(partner?.id),
                                          },
                                        }}
                                      >
                                        {partner.name}
                                      </Link>{' '}
                                      <br />
                                      <span className="text-muted">
                                        {partner.email}
                                      </span>
                                      {/* <div>
                                        {partner.businessCategory !== null &&
                                          (
                                            <span>
                                              {' '}
                                              <Badge variant="primary">
                                                {partner.businessCategory}
                                              </Badge>{' '}
                                            </span>


                                          )}
                                      </div> */}
                                    </Col>
                                    <Col className="text-center" md="4" xs="4">
                                      <br></br>
                                      {partner.businessCategory !== null && (
                                        <span>
                                          {' '}
                                          <Badge variant="primary">
                                            {partner.businessCategory}
                                          </Badge>{' '}
                                        </span>
                                      )}
                                      {/* {!showPublicView && (<Button
                                        className="btn-round btn-icon"
                                        color="success"
                                        outline
                                        size="sm"
                                      >
                                        Select
                                       <i className="fa fa-envelope" /> */}
                                      {/* </Button>)}  */}
                                    </Col>
                                  </Row>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
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
                                  Name <span className="required"></span>
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
                                <Form.Label htmlFor="categorypreference">
                                  Event Category Preferences{' '}
                                  <span className="required"></span>
                                </Form.Label>
                                <Row>
                                  <Col className="form-group" xl={4} lg={6}>
                                    <input
                                      type="checkbox"
                                      id="Automotive"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Automotive'
                                      )}
                                    />
                                    <label
                                      htmlFor="Automotive"
                                      style={{ marginLeft: '4px' }}
                                    >
                                      {' '}
                                      Automotive
                                    </label>
                                  </Col>
                                  <Col className="form-group" xl={4} lg={6}>
                                    <input
                                      type="checkbox"
                                      id="Business Support & Supplies"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Business Support & Supplies'
                                      )}
                                    />
                                    <label
                                      htmlFor="Business Support & Supplies"
                                      style={{ marginLeft: '4px' }}
                                    >
                                      {' '}
                                      Business Support & Supplies
                                    </label>
                                  </Col>
                                  <Col className="form-group" xl={4} lg={6}>
                                    <input
                                      type="checkbox"
                                      id="Computers & Electronics"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Computers & Electronics'
                                      )}
                                    />
                                    <label
                                      htmlFor="Computers & Electronics"
                                      style={{ marginLeft: '4px' }}
                                    >
                                      {' '}
                                      Computers & Electronics
                                    </label>
                                  </Col>
                                  <Col className="form-group" xl={4} lg={6}>
                                    <input
                                      type="checkbox"
                                      id="Construction & Contractor"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Construction & Contractor'
                                      )}
                                    />
                                    <label
                                      htmlFor="Construction & Contractor"
                                      style={{ marginLeft: '4px' }}
                                    >
                                      {' '}
                                      Construction & Contractor
                                    </label>
                                  </Col>
                                  <Col className="form-group" xl={4} lg={6}>
                                    <input
                                      type="checkbox"
                                      id="Education"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Education'
                                      )}
                                    />
                                    <label
                                      htmlFor="Education"
                                      style={{ marginLeft: '4px' }}
                                    >
                                      {' '}
                                      Education
                                    </label>
                                  </Col>
                                  <Col className="form-group" xl={4} lg={6}>
                                    <input
                                      type="checkbox"
                                      id="Entertainment"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Entertainment'
                                      )}
                                    />
                                    <label
                                      htmlFor="Entertainment"
                                      style={{ marginLeft: '4px' }}
                                    >
                                      {' '}
                                      Entertainment
                                    </label>
                                  </Col>
                                  <Col className="form-group" xl={4} lg={6}>
                                    <input
                                      type="checkbox"
                                      id="Food & Dining"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Food & Dining'
                                      )}
                                    />
                                    <label
                                      htmlFor="Food & Dining"
                                      style={{ marginLeft: '4px' }}
                                    >
                                      {' '}
                                      Food & Dining
                                    </label>
                                  </Col>
                                  <Col className="form-group" xl={4} lg={6}>
                                    <input
                                      type="checkbox"
                                      id="Health & Medicine"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Health & Medicine'
                                      )}
                                    />
                                    <label
                                      htmlFor="Health & Medicine"
                                      style={{ marginLeft: '4px' }}
                                    >
                                      {' '}
                                      Health & Medicine
                                    </label>
                                  </Col>
                                  <Col className="form-group" xl={4} lg={6}>
                                    <input
                                      type="checkbox"
                                      id="Home & Garden"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Home & Garden'
                                      )}
                                    />
                                    <label
                                      htmlFor="Home & Garden"
                                      style={{ marginLeft: '4px' }}
                                    >
                                      {' '}
                                      Home & Garden
                                    </label>
                                  </Col>
                                  <Col className="form-group" xl={4} lg={6}>
                                    <input
                                      type="checkbox"
                                      id="Legal & Financial"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Legal & Financial'
                                      )}
                                    />
                                    <label
                                      htmlFor="Legal & Financial"
                                      style={{ marginLeft: '4px' }}
                                    >
                                      {' '}
                                      Legal & Financial
                                    </label>
                                  </Col>
                                  <Col
                                    className="form-group"
                                    xl={4}
                                    lg={6}
                                    style={{ display: 'flex' }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="Manufacturing, Wholesale, Distribution"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Manufacturing, Wholesale, Distribution'
                                      )}
                                    />
                                    <label
                                      htmlFor="Manufacturing, Wholesale, Distribution"
                                      style={{
                                        marginLeft: '4px',
                                        marginTop: '-4px',
                                      }}
                                    >
                                      Manufacturing, Wholesale, Distribution
                                    </label>
                                  </Col>
                                  <Col className="form-group" xl={4} lg={6}>
                                    <input
                                      type="checkbox"
                                      id="Merchants (Retail)"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Merchants (Retail)'
                                      )}
                                    />
                                    <label
                                      htmlFor="Merchants (Retail)"
                                      style={{ marginLeft: '4px' }}
                                    >
                                      {' '}
                                      Merchants (Retail)
                                    </label>
                                  </Col>
                                  <Col className="form-group" xl={4} lg={6}>
                                    <input
                                      type="checkbox"
                                      id="Personal Care & Services"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Personal Care & Services'
                                      )}
                                    />
                                    <label
                                      htmlFor="Personal Care & Services"
                                      style={{ marginLeft: '4px' }}
                                    >
                                      {' '}
                                      Personal Care & Services
                                    </label>
                                  </Col>
                                  <Col className="form-group" xl={4} lg={6}>
                                    <input
                                      type="checkbox"
                                      id="Real Estate"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Real Estate'
                                      )}
                                    />
                                    <label
                                      htmlFor="Real Estate"
                                      style={{ marginLeft: '4px' }}
                                    >
                                      {' '}
                                      Real Estate
                                    </label>
                                  </Col>
                                  <Col className="form-group" xl={4} lg={6}>
                                    <input
                                      type="checkbox"
                                      id="Travel & Transportation"
                                      name="catPrefOption"
                                      onClick={toggleCategoryPreference.bind(
                                        this
                                      )}
                                      defaultChecked={user?.categoryPreferences.find(
                                        (e) => e == 'Travel & Transportation'
                                      )}
                                    />
                                    <label
                                      htmlFor="Travel & Transportation"
                                      style={{ marginLeft: '4px' }}
                                    >
                                      {' '}
                                      Travel & Transportation
                                    </label>
                                  </Col>
                                </Row>
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
                                  <div key={default-${type}} className="mb-3">
                                    <Form.Check
                                      type={type}
                                      id={default-${type}}
                                      label={'Receive updates for upcoming events [need discuss eo receive what?]'}
                                    />

                                    <Form.Check
                                      type={type}
                                      id={default-${type}}
                                      label={default ${type}}
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
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setShow(true)}
                        >
                          Disable
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
      <div style={{ display: "none" }}>
        { //initialise categoryPreferences
          (categoryPreferences = user?.categoryPreferences)
        }
      </div>
    </AttendeeWrapper>
    // </LayoutOne>
  );
}
