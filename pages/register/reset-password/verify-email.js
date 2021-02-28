import { useRef } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { LayoutOne } from '../../../layouts';
import { BreadcrumbOne } from '../../../components/Breadcrumb';
import { useState, useEffect } from 'react';
import cx from 'classnames';
// import {
//   Alert,
//   AlertIcon,
//   Button,
//   Container,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Grid,
//   GridItem,
//   Heading,
// } from '@chakra-ui/react';
import {
  Alert,
  Button,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

import api from '../../../lib/ApiClient';

import NavBar from '../../../components/NavBar/NavBar';
// import PageContainer from '../../../components/PageContainer';
import Card from '../../../components/Card';
import PasswordInput from '../../../components/settings/PasswordInput';
import ChakraWrapper from '../../../components/ChakraWrapper';

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      ...query,
    },
  };
};

export default function ResetPassword({ token }) {
  const { register, handleSubmit, errors, watch } = useForm();
   //check if pw and confirm pw is the same before updating pw
  const [confirmPW, setConfirmPW] = useState(false);
  //success/error message for pw update
  const [pwAlert, setPWAlert] = useState("");
  //show pw error alert
  const [showPW, setShowPW] = useState(false);

  const { mutate, isSuccess, isError } = useMutation((data) =>
    api.post('/api/user/reset-password', data).then(response =>{
      console.log("response");
      console.log(response);
      document.getElementById('reset-password-form').reset();
      setPWAlert("Your password has been reset successfully!");
      setConfirmPW(true);
      setShowPW(true);
    }).catch(error =>{
      console.log(error)
      setConfirmPW(false);
      setPWAlert("An error has occured.");
      setShowPW(true);
    })
  );

  const password = useRef({});
  password.current = watch('password', '');
  const onSubmit = async (data) => {
  console.log('onsubmit 1');
  console.log(data);
  setPWAlert('');
  setShowPW(false);
  setConfirmPW(false);

  var result = validatePassword(data.password,data.password_confirm);
  console.log('result');
  console.log(result);

  if (result == 'correct') {
    //setConfirmPW(true);
    //setShowPW(false);
    console.log('onsubmit password2');
     mutate({ newPassword: data.password, token });
  } else if (result == 'incorrect') {
    setPWAlert('Passwords do not match.');
    setShowPW(true);
  }


  };
  function validatePassword(newPassword, confirmPassword) {
       console.log('in validate password');
    if (
      JSON.stringify(newPassword) === JSON.stringify(confirmPassword)
    ) {
      console.log(newPassword);
       console.log(confirmPassword);
      return "correct";
    } else {
     
      return "incorrect";
    }
  }

  return (
    <LayoutOne>
      <Head>
        <title>Change Password</title>
      </Head>
      <BreadcrumbOne pageTitle="Reset Password">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item active">Reset Password</li>
        </ol>
      </BreadcrumbOne>
      <Container>
        {isError && (
          <Alert status="error" mb={3}>
            An error occurred. Please try again.
          </Alert>
        )}
   
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} id="reset-password-form">
            {/* <Form.Control isInvalid={errors.password}> */}
            <Row>
              <Col md={12}>
                <label>New password</label>
                <input
                  required
                  type="password"
                  name="password"
                  className="form-group form-control"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  ref={register()}
                  placeholder="Enter new password"
                />
              </Col>
              {/* <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage> */}
              {/* </Form.Control> */}

              {/* <Form.Control isInvalid={errors.password_confirm}> */}
              <Col md={12}>
                <label>Confirm password</label>
                <input
                  required
                  type="password"
                  name="password_confirm"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  className="form-group form-control"
                  placeholder="Re-enter your new password"
                  ref={register()}
                />
              </Col>
              {/* <FormErrorMessage>
                      {errors.password_confirm &&
                        errors.password_confirm.message}
                    </FormErrorMessage> */}
              {/* </Form.Control> */}
              <Col>
                <button
                  type="submit"
                  className="btn btn-fill-out"
                  name="submit"
                  value="Submit"
                >
                  Submit
                </button>
              </Col>
            </Row>
          </form>
          <div>
            &nbsp;
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
          </div>
        </Card>
        {/* )} */}
      </Container>
    </LayoutOne>
  );
}

ResetPassword.propTypes = {
  token: PropTypes.string,
};
