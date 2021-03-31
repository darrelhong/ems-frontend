import Link from 'next/link';
import { useState, useEffect } from 'react';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import ButtonWithLoading from '../../components/custom/ButtonWithLoading';
import { getUser, getUserPaymentMethod } from '../../lib/query/getUser';
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
  IoIosContacts,
} from 'react-icons/io';

import { useForm } from 'react-hook-form';
//import useUser from '../../lib/query/useUser';
import {
  getFollowingEo,
  getFollowingBp,
} from '../../lib/query/getAttendeeFollowing';

import { useMutation, useQueryClient } from 'react-query';
import api from '../../lib/ApiClient';
import { logout } from '../../lib/auth';

// cards
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const MyAccount = () => {
  // const [setShowFailedMsg] = useState(false);
  //var categoryPreferences = [];
  const [loginLoading, setLoginLoading] = useState(false);

  // const [fileUpload, setfileUpload] = useState(false);
  // const [file, setFile] = useState('uploadfile');

  const [fileName, setFileName] = useState('Choose image');

  //const { data: user } = useUser(localStorage.getItem('userId'));

  const [proficpicfile, setProfilePicFile] = useState('uploadprofilepicfile');
  const [profilepicUrl, setProfilepicUrl] = useState(null);
  const [ispicupdated, setIspicupdated] = useState(false);

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
  const [followingBp, setFollowingBp] = useState([]);
  const [followingEo, setFollowingEo] = useState([]);

  //Email Notification Setting
  //const [allEmailNoti, setAllEmailNoti] = useState(true);
  const [eoEventBroadcast, setEoEventBroadcast] = useState(true);
  const [showNotiSuccess, setShowNotiSuccess] = useState(false);
  const [showNotiError, setShowNotiError] = useState(false);

  // for card modal
  const [showCardModal, setShowCardModal] = useState(false);
  const handleCloseCardModal = () => setShowCardModal(false);

  // for payment api
  const [cardinfoSucessMsg, setCardinfoSucessMsg] = useState(false);
  const [showcardinfoErrorMsg, setShowcardinfoErrorMsg] = useState('');
  const [cardinfoErrorMsg, setCardErrorMsg] = useState(false);
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expMth, setExpMth] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [user, setUser] = useState('');
  //const { data: user } = useUser(localStorage.getItem('userId'));
  const [categoryPreferences, setCategoryPreferences] = useState([]);

  const getUserData = async () => {
    await getUser(localStorage.getItem('userId')).then((data) => {
      if (data != undefined) {
        setUser(data);
        setEoEventBroadcast(data.eoEmailNoti);
      }
      //setAllEmailNoti(data.systemEmailNoti);
      if (data != undefined && data.paymentMethodId != null) {
        getUserPayment();
      }
    });
  };
  useEffect(() => {
    //console.log(user);
    getUserData();
    // if (user != undefined && user?.paymentMethodId != null) {
    //   getUserPayment();
    // }
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

  // const renderAllNotiTooltip = (props) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     Notification includes Enquiry
  //   </Tooltip>
  // );

  const renderEoEmailNotiTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Notification includes message from event organiser
    </Tooltip>
  );

  const getUserPayment = async () => {
    await getUserPaymentMethod().then((data) => {
      console.log(data);
      setPaymentMethod(data);
    });
  };

  const handleNameInputFocus = (e) => {
    setFocus(e.target.cardholdername);
  };

  const handleCardnumberInputFocus = (e) => {
    setFocus(e.target.cardnumber);
  };

  const handleExpMthInputFocus = (e) => {
    setFocus(e.target.expMth);
  };
  const handleExpYearInputFocus = (e) => {
    setFocus(e.target.expYear);
  };
  const handleCvcInputFocus = (e) => {
    setFocus(e.target.cvc);
  };
  const handleNameInputChange = (e) => {
    //cardholdername: data.cardholdername,
    // cardnumber: data.cardnumber,
    // expMth: data.expMth,
    // expYear: data.expYear,
    // cvc: data.cvc,
    const { cardholdername, value } = e.target;
    setName(value);
  };
  const handleCardNumberInputChange = (e) => {
    const { cardnumber, value } = e.target;
    setNumber(value);
  };

  const handleExpYearInputChange = (e) => {
    const { expYr, value } = e.target;
    console.log('value');
    console.log(value);
    setExpiry(expMth + value);
  };
  const handleExpMthInputChange = (e) => {
    const { expDate, value } = e.target;
    setExpMth(value);
  };
  const handleCvcInputChange = (e) => {
    const { cvc, value } = e.target;
    setCvc(value);
  };

  const onSubmitCardPaymentMethod = async (data) => {
    console.log('submit card payment');
    console.log(data);
    setShowcardinfoErrorMsg(false);
    setCardinfoSucessMsg(false);
    setLoginLoading(true);
    mutateCardPaymentMethod.mutate({
      cardholdername: data.cardholdername,
      cardnumber: data.cardnumber,
      expMth: data.expMth,
      expYear: data.expYear,
      cvc: data.cvc,
    });
  };

  const mutateCardPaymentMethod = useMutation((data) => {
    console.log('data');
    console.log(data);
    api
      .post(`/api/user/addCardPayment`, data, {
        onSuccess: () => {
          // queryClient.invalidateQueries(['user', user?.id.toString()]);
          // logout({ redirectTo: '/organiser/login' });
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setLoginLoading(false);
          console.log(response.data.message);
          var message = response.data.message;
          if (message.includes('incorrect_number')) {
            setCardErrorMsg('Your card number is incorrect');
            setCardinfoSucessMsg(false);
            setShowcardinfoErrorMsg(true);
          } else if (message.includes('invalid_expiry_year')) {
            setCardErrorMsg("Your card's expiration year is invalid.");
            setCardinfoSucessMsg(false);
            setShowcardinfoErrorMsg(true);
          } else if (message.includes('invalid_expiry_month')) {
            setCardErrorMsg("Your card's expiration month is invalid.");
            setCardinfoSucessMsg(false);
            setShowcardinfoErrorMsg(true);
          } else if (message.includes('invalid_cvc')) {
            setCardErrorMsg("Your card's security code is invalid.");
            setCardinfoSucessMsg(false);
            setShowcardinfoErrorMsg(true);
          } else if (message == 'success_added') {
            setShowcardinfoErrorMsg(false);
            setCardinfoSucessMsg(true);
            console.log('getUserData1');
            getUserData();
            console.log('getPay3');
            //getUserPayment();

            //document.getElementById('payment-method-form').reset();
          } else if (message == 'dbError') {
            setCardErrorMsg('An error has occured');
            setCardinfoSucessMsg(false);
            setShowcardinfoErrorMsg(true);
          } else {
            setCardErrorMsg('An error has occured');
            setCardinfoSucessMsg(false);
            setShowcardinfoErrorMsg(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const mutatePaymentCard = useMutation(() =>
    api.post(`/api/user/deleteCardPayment`).then((response) => {
      console.log('delete');
      console.log(response);
      if (response.status == '200') {
        getUserData();
        setShowcardinfoErrorMsg(false);
        setCardinfoSucessMsg(false);
        setCvc('');
        setExpiry('');
        setFocus('');
        setName('');
        setNumber('');
        setExpMth('');
        setLoginLoading(false);
      }
    })
  );

  const handleDeleteCard = async () => {
    setLoginLoading(true);
    mutatePaymentCard.mutate();
    // close the modal once yes click.
    setShowCardModal(false);
  };

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
  const mutateAccDetail = useMutation((data) => {
    var form_data = new FormData();
    form_data.append('address', data['address']);
    form_data.append('description', data['description']);
    form_data.append('name', data['name']);
    form_data.append('phonenumber', data['phonenumber']);
    form_data.append('categoryPreferences', user?.categoryPreferences);

    if (fileName !== 'Choose image') {
      form_data.append('profilepicfile', proficpicfile);
    } else {
      form_data.append('profilepicfile', null);
    }

    form_data.append('id', data['id']);

    api
      .post('/api/attendee/updateAttProfile', form_data, {
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
    console.log('data acc' + data['name']);
    if (!compareArrays(user?.categoryPreferences, categoryPreferences)) {
      console.log('if');
      console.log(user?.categoryPreferences);
      console.log(categoryPreferences);
      mutateAccDetail.mutate({
        address: data.address,
        description: data.description,
        name: data.name,
        phonenumber: data.phonenumber,
        id: user?.id,
        categoryPreferences: categoryPreferences,
      });
      user.categoryPreferences = categoryPreferences;
    } else {
      console.log('else');
      console.log(user?.categoryPreferences);
      console.log(categoryPreferences);
      mutateAccDetail.mutate({
        address: data.address,
        description: data.description,
        name: data.name,
        phonenumber: data.phonenumber,
        id: user?.id,
        categoryPreferences: user?.categoryPreferences,
      });
    }
  };

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
        if (response.data['message'] == 'Success') {
          document.getElementById('change-password-form').reset();
          setPWAlert('Your password has been updated successfully!');

          setConfirmPW(true);
          setShowPW(true);
          setLoginLoading(false);
        } else if (response.data['message'] == 'Old password is incorrect.') {
          setPWAlert('Old password is incorrect.');
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

  const onSubmitPassword = async (data) => {
    setPWAlert('');
    setShowPW(false);
    setConfirmPW(false);
    setLoginLoading(true);

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

  const onSubmitEmailNotification = async () => {
    setShowNotiSuccess(false);
    setShowNotiError(false);
    setLoginLoading(true);

    mutateEmailNotiSetting.mutate({
      //systemEmailNoti: allEmailNoti,
      eoEmailNoti: eoEventBroadcast,
    });
  };

  const onPreferenceChange = async (selected) => {
    // categoryPreferences = selected;
    console.log('call on preference change');
    console.log(selected);
    setCategoryPreferences(selected);
    console.log(categoryPreferences);
  };

  // const handleAllEmailNoti = async () => {
  //   console.log('check handleAllEmailNoti');

  //   if (allEmailNoti == true) {
  //     setAllEmailNoti(false);
  //   } else if (allEmailNoti == false) {
  //     setAllEmailNoti(true);
  //   }
  // };

  const handleEoEventBroadcast = async () => {
    console.log('check handleEoEventBroadcast');
    if (eoEventBroadcast == true) {
      setEoEventBroadcast(false);
    } else if (eoEventBroadcast == false) {
      setEoEventBroadcast(true);
    }
  };

  const mutateEmailNotiSetting = useMutation((data) => {
    console.log(data);
    api
      .post('/api/user/updateEmailNoti', data)
      .then((response) => {
        if (response.status == '200') {
          if (data != null) {
            setShowNotiSuccess(true);
            setShowNotiError(false);
            setLoginLoading(false);
          } else {
            setShowNotiError(true);
            setShowNotiSuccess(false);
            setLoginLoading(false);
          }
        } else {
          setShowNotiError(true);
          setShowNotiSuccess(false);
          setLoginLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

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
      <Modal show={showCardModal} onHide={handleCloseCardModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the payment method?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-fill-out btn" onClick={handleDeleteCard}>
            Yes
          </button>
          <Button variant="secondary" onClick={handleCloseCardModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <BreadcrumbOne pageTitle="My Account">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/attendee/home">
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
                                <Nav.Link eventKey="organiser">
                                  Event Organiser
                                </Nav.Link>
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
                                              <ul>
                                                <hr></hr>
                                                <Row>
                                                  <Col md="1" xs="1">
                                                    {' '}
                                                    &nbsp;
                                                  </Col>
                                                  <Col md="2" xs="2">
                                                    <div className="avatar">
                                                      {follow?.profilePic ==
                                                        null && (
                                                        <img
                                                          src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                                          className="img-circle img-no-padding img-responsive"
                                                        />
                                                      )}
                                                      {follow?.profilePic !=
                                                        null && (
                                                        <Image
                                                          className="img-circle img-no-padding img-responsive"
                                                          src={
                                                            follow?.profilePic
                                                          }
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
                                                          paraId: JSON.stringify(
                                                            follow?.id
                                                          ),
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
                                                        {follow.description !=
                                                          null &&
                                                          follow.description}
                                                        {follow.description ==
                                                          null &&
                                                          'There is no description yet.'}
                                                      </span>
                                                    </div>
                                                  </Col>

                                                  <Col
                                                    className="text-left"
                                                    md="4"
                                                    xs="4"
                                                  >
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
                                              </ul>
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
                                                        {partner?.profilePic ==
                                                          null && (
                                                          <img
                                                            src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                                            className="img-circle img-no-padding img-responsive"
                                                          />
                                                        )}
                                                        {partner?.profilePic !=
                                                          null && (
                                                          <Image
                                                            className="img-circle img-no-padding img-responsive"
                                                            src={
                                                              partner?.profilePic
                                                            }
                                                          />
                                                        )}
                                                      </div>
                                                    </Col>
                                                    <Col md="4" xs="4">
                                                      {/* <br></br> */}
                                                      <Link
                                                        href={{
                                                          pathname:
                                                            '/partner/partner-profile',
                                                          query: {
                                                            paraId: JSON.stringify(
                                                              partner?.id
                                                            ),
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
                                                    <Col
                                                      className="text-center"
                                                      md="4"
                                                      xs="4"
                                                    >
                                                      <br></br>
                                                      {partner.businessCategory !==
                                                        null && (
                                                        <span>
                                                          {' '}
                                                          <Badge variant="primary">
                                                            {
                                                              partner.businessCategory
                                                            }
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
                        <h3>Card Payment Method</h3>
                      </Card.Header>
                      <Card.Body>
                        {user?.paymentMethodId == null && (
                          <div className="account-details-form">
                            <form
                              id="payment-method-form"
                              onSubmit={handleSubmit(onSubmitCardPaymentMethod)}
                            >
                              <div
                                style={{
                                  display: cardinfoSucessMsg ? 'block' : 'none',
                                }}
                              >
                                {
                                  <Alert
                                    show={cardinfoSucessMsg}
                                    variant="success"
                                    onClose={() => setCardinfoSucessMsg(false)}
                                    dismissible
                                  >
                                    {' '}
                                    Card Added Sucessfully{' '}
                                  </Alert>
                                }
                              </div>
                              <div
                                style={{
                                  display: showcardinfoErrorMsg
                                    ? 'block'
                                    : 'none',
                                }}
                              >
                                {
                                  <Alert
                                    show={showcardinfoErrorMsg}
                                    variant="danger"
                                    onClose={() =>
                                      setShowcardinfoErrorMsg(false)
                                    }
                                    dismissible
                                  >
                                    {' '}
                                    {cardinfoErrorMsg}{' '}
                                  </Alert>
                                }
                              </div>
                              <Row>
                                <Cards
                                  cvc={cvc}
                                  expiry={expiry}
                                  focused={focus}
                                  name={name}
                                  number={number}
                                />

                                <Col className="form-group" md={12}>
                                  <br></br>
                                  <label>
                                    Card Holder Name{' '}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required
                                    className="form-control"
                                    name="cardholdername"
                                    type="text"
                                    placeholder="Name"
                                    ref={register()}
                                    onChange={handleNameInputChange}
                                    onFocus={handleNameInputFocus}
                                  />
                                </Col>
                                <Col className="form-group" md={12}>
                                  <label>
                                    Card Number{' '}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required
                                    className="form-control"
                                    name="cardnumber"
                                    type="text"
                                    placeholder="Enter card number"
                                    // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    maxLength="16"
                                    ref={register()}
                                    onChange={handleCardNumberInputChange}
                                    onFocus={handleCardnumberInputFocus}
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col className="form-group" md={4}>
                                  <label>
                                    Expiry Month
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required
                                    className="form-control"
                                    name="expMth"
                                    type="text"
                                    placeholder="Eg. 01"
                                    maxLength="2"
                                    ref={register()}
                                    onChange={handleExpMthInputChange}
                                    onFocus={handleExpMthInputFocus}
                                  />
                                </Col>
                                <Col className="form-group" md={4}>
                                  <label>
                                    Expiry Year
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required
                                    className="form-control"
                                    name="expYear"
                                    type="text"
                                    placeholder="Eg.23"
                                    maxLength="2"
                                    ref={register()}
                                    onChange={handleExpYearInputChange}
                                    onFocus={handleExpYearInputFocus}
                                  />
                                </Col>
                                <Col className="form-group" md={4}>
                                  <label>
                                    CVC
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required
                                    className="form-control"
                                    name="cvc"
                                    type="text"
                                    placeholder="CVC"
                                    maxLength="3"
                                    ref={register()}
                                    onChange={handleCvcInputChange}
                                    onFocus={handleCvcInputFocus}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <ButtonWithLoading
                                    type="submit"
                                    className="btn btn-fill-out"
                                    name="submit"
                                    value="Submit"
                                    isLoading={loginLoading}
                                  >
                                    Submit
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
                              </Row>
                            </form>
                          </div>
                        )}

                        {user?.paymentMethodId != null &&
                          paymentMethod != null &&
                          paymentMethod.card != null &&
                          paymentMethod.card.brand != null &&
                          paymentMethod.card.brand == 'visa' && (
                            <div className="account-details-form">
                              <Cards
                                cvc={'***'}
                                expiry={expiry}
                                focused={focus}
                                name={'LIN LILI'}
                                number={
                                  '4***********' + paymentMethod.card.last4
                                }
                                preview={true}
                              />
                              <br></br>
                              <ButtonWithLoading
                                type="submit"
                                className="btn btn-fill-out"
                                name="deleteCard"
                                isLoading={loginLoading}
                                onClick={() => setShowCardModal(true)}
                              >
                                Delete Payment Method
                              </ButtonWithLoading>
                            </div>
                          )}
                        {user?.paymentMethodId != null &&
                          paymentMethod != null &&
                          paymentMethod.card != null &&
                          paymentMethod.card.brand != null &&
                          paymentMethod.card.brand == 'mastercard' && (
                            <div className="account-details-form">
                              <Cards
                                cvc={'***'}
                                expiry={expiry}
                                focused={focus}
                                name={paymentMethod.billing_details.name}
                                number={
                                  '5***********' + paymentMethod.card.last4
                                }
                                preview={true}
                              />
                              <br></br>
                              <ButtonWithLoading
                                type="submit"
                                className="btn btn-fill-out"
                                name="deleteCard"
                                isLoading={loginLoading}
                                onClick={() => setShowCardModal(true)}
                              >
                                Delete Payment Method
                              </ButtonWithLoading>
                            </div>
                          )}
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
                          <Alert
                            show={showAccSaved}
                            variant="success"
                            onClose={() => setAccSaved(false)}
                            dismissible
                          >
                            {accSuccess}
                          </Alert>
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
                          {/* <Row>
                            <Col className="form-group" xs={10} md={6}>
                              <Image
                                className="profile-image"
                                src={profilepicUrl}
                                thumbnail
                              />
                            </Col>
                          </Row> */}
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
                                  Name <span className="required">*</span>
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
                              {/* {user?.id != null && ( */}
                              <div className="col-12 d-md-flex">
                                <Col className="form-group" md={12}>
                                  <Form.Label htmlFor="categorypreference">
                                    Event Category Preferences{' '}
                                    <span className="required"></span>
                                  </Form.Label>

                                  <DropdownMultiselect
                                    options={[
                                      {
                                        key: 'Automotive',
                                        label: 'Automotive',
                                      },
                                      {
                                        key: 'Business Support & Supplies',
                                        label: 'Business Support & Supplies',
                                      },
                                      {
                                        key: 'Computers & Electronics',
                                        label: 'Computers & Electronics',
                                      },
                                      {
                                        key: 'Construction & Contractor',
                                        label: 'Construction & Contractor',
                                      },
                                      { key: 'Education', label: 'Education' },
                                      {
                                        key: 'Entertainment',
                                        label: 'Entertainment',
                                      },
                                      {
                                        key: 'Food & Dining',
                                        label: 'Food & Dining',
                                      },
                                      {
                                        key: 'Health & Medicine',
                                        label: 'Health & Medicine',
                                      },
                                      {
                                        key: 'Home & Garden',
                                        label: 'Home & Garden',
                                      },
                                      {
                                        key: 'Legal & Financial',
                                        label: 'Legal & Financial',
                                      },
                                      {
                                        key:
                                          'Manufacturing, Wholesale, Distribution',
                                        label:
                                          'Manufacturing, Wholesale, Distribution',
                                      },
                                      {
                                        key: 'Merchants (Retail)',
                                        label: 'Merchants (Retail)',
                                      },
                                      {
                                        key: 'Personal Care & Services',
                                        label: 'Personal Care & Services',
                                      },
                                      {
                                        key: 'Real Estate',
                                        label: 'Real Estate',
                                      },
                                      {
                                        key: 'Travel & Transportation',
                                        label: 'Travel & Transportation',
                                      },
                                    ]}
                                    selected={user?.categoryPreferences}
                                    handleOnChange={onPreferenceChange}
                                    name="ddlCategoryPreferences"
                                    // className="displayBlock mt10"
                                  />
                                </Col>
                              </div>

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
                            <div>&nbsp;</div>
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
                          <form
                            id="notification-setting-form"
                            onSubmit={handleSubmit(onSubmitEmailNotification)}
                          >
                            <Alert
                              show={showNotiSuccess}
                              variant="success"
                              onClose={() => setShowNotiSuccess(false)}
                              dismissible
                            >
                              {
                                'You have sucessfully update your notification settings'
                              }
                            </Alert>

                            <Alert
                              show={showNotiError}
                              variant="success"
                              onClose={() => setShowNotiError(false)}
                              dismissible
                            >
                              {'An Error has occured'}
                            </Alert>
                            <Row>
                              <Col className="form-group" lg={8} xs={6}></Col>
                              <Col
                                className="form-group"
                                lg={2}
                                xs={3}
                                style={{ textAlign: 'center' }}
                              >
                                Email
                              </Col>
                              {/* <Col
                                className="form-group"
                                lg={2}
                                xs={3}
                                style={{ textAlign: 'center' }}
                              >
                                System
                              </Col> */}
                            </Row>
                            {/* <Row>
                              <Col className="form-group" lg={8} xs={6}>
                                All notifications &nbsp;
                                <OverlayTrigger
                                  placement="right"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderAllNotiTooltip}
                                >
                                  <BsFillInfoCircleFill></BsFillInfoCircleFill>
                                </OverlayTrigger>
                              </Col>
                              <Col
                                className="form-group"
                                lg={2}
                                xs={3}
                                style={{ textAlign: 'center' }}
                              >
                                {/* <Form.Check id="chkAllNotificationsEmail" /> */}
                            {/* <input
                                  type="checkbox"
                                  checked={allEmailNoti}
                                  defaultChecked={user?.systemEmailNoti}
                                  onChange={handleAllEmailNoti}
                                />
                              </Col>
                            </Row> */}
                            <Row>
                              <Col className="form-group" lg={8} xs={6}>
                                Event broadcasts from Event Organisers &nbsp;
                                <OverlayTrigger
                                  placement="right"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderEoEmailNotiTooltip}
                                >
                                  <BsFillInfoCircleFill></BsFillInfoCircleFill>
                                </OverlayTrigger>
                              </Col>
                              <Col
                                className="form-group"
                                lg={2}
                                xs={3}
                                style={{ textAlign: 'center' }}
                              >
                                <input
                                  type="checkbox"
                                  checked={eoEventBroadcast}
                                  defaultChecked={user?.eoEmailNoti}
                                  onChange={handleEoEventBroadcast}
                                />
                                {/* <Form.Check id="chkEventBroadcastsEmail" /> */}
                              </Col>
                              {/* <Col
                                className="form-group"
                                lg={2}
                                xs={3}
                                style={{ textAlign: 'center' }}
                              >
                                <Form.Check id="chkEventBroadcasts" />
                              </Col> */}
                            </Row>

                            <ButtonWithLoading
                              type="submit"
                              className="btn btn-fill-out"
                              name="submit"
                              value="Submit"
                              isLoading={loginLoading}
                            >
                              Save
                            </ButtonWithLoading>
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
                            <div>&nbsp;</div>
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
    </AttendeeWrapper>
    //{' '}
    //    </LayoutOne>
  );
};
export default MyAccount;
