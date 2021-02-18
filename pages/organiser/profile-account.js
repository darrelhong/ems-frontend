import Link from 'next/link';
import { useState } from 'react';
// import { LayoutOne } from '../../layouts';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { Container, Row, Col } from 'react-bootstrap';
import {FaRegEdit } from 'react-icons/fa';
import OrganiserWrapper from '../../components/wrapper/OrganiserWrapper';

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
import Alert from 'react-bootstrap/Alert'

const MyAccount = () => {

  //for modal of disabling account
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // success message for update account details
  const [accSuccess, setAccSuccess] = useState("");
  //update account details alert 
  const [showAccSaved, setAccSaved] = useState(false);


  //check if pw and confirm pw is the same before updating pw
  const [confirmPW, setConfirmPW] = useState(false);
  //success/error message for pw update
  const [pwAlert, setPWAlert] = useState("");
  //show pw error alert
  const [showPW, setShowPW] = useState(false);

  const { data: user } = useUser(
    localStorage.getItem('userId')

  );
  
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


  const mutateAccDetail = useMutation(

    (data) => api.post('/api/user/update', data) 
    .then(response => {
      setAccSaved(true);
     setAccSuccess(" Account details saved successfully! ");
     document.getElementById("account-details-form").reset();

    }).catch(error =>{
      console.log(error)

    }

    )
  );



  const mutatePassword = useMutation(
  
    (data) => api.post('/api/user/change-password', data)
    .then(response =>{
      document.getElementById("change-password-form").reset();
      setPWAlert("Your password has been updated successfully!");
    }).catch(error =>{
      console.log(error)
      setConfirmPW(false);
      setPWAlert("An error has occured.");
      setShowPW(true);
    })
    
  );


  const onSubmit = async (data) => {
    console.log('data acc' + data["name"]);
    mutateAccDetail.mutate({
      address: data.address,
      description: data.description,
      name: data.name,
      phonenumber: data.phonenumber,
      id: user?.id,
    });    

  };

  const onSubmitPassword = async (data) => {
    setPWAlert("");
    validatePassword(data.oldPassword, data.newPassword, data.confirmPassword);  
    if(confirmPW) { 
      setShowPW(false);
      mutatePassword.mutate({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
  }
  };

  function validatePassword (oldPassword, newPassword, confirmPassword)  {


      if(JSON.stringify(newPassword) === JSON.stringify(confirmPassword) && (JSON.stringify(oldPassword) != JSON.stringify(newPassword))){
        setConfirmPW(true);
      } else if(JSON.stringify(oldPassword) === JSON.stringify(newPassword)){
        setPWAlert("Your current password is the same as the new password.");
        setShowPW(true);
    }else{
        setPWAlert("Passwords do not match.");
        setShowPW(true);
      }
  }


  return (
    // <LayoutOne> 
    <OrganiserWrapper title="Organiser Home">
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
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>Account Details</h3>
                      </Card.Header>
                      <Card.Body>

                        <div className="account-details-form">
                          <form id="account-details-form" onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                              <Col className="form-group" md={12}>
                                <Form.Group>
                                  <Form.File
                                    id="exampleFormControlFile1"
                                    label="Profile Picture"
                                    type="file"
                                  />
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
                                  maxlength="8"
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
                            <div>
                              &nbsp;
                            </div>
                            <Alert show={showAccSaved} variant="success" onClose={() => setAccSaved(false)} dismissible>
                               {accSuccess}                         
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
                        <div className="account-details-form">
                          <form id="change-password-form" onSubmit={handleSubmit(onSubmitPassword)}>
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
                          <div>
                          &nbsp;
                          </div>
                          <Alert show={confirmPW} variant="success" onClose={() => setConfirmPW(false)} dismissible>
                               {pwAlert}                         
                            </Alert>
                            <Alert show={!confirmPW && showPW} onClose={() => setShowPW(false)} variant="danger" dismissible>
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
    </OrganiserWrapper>
    // </LayoutOne>

  );
};

export default MyAccount;