import { useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

import api from '../../lib/ApiClient';

import NavBar from '../../components/NavBar/NavBar';
import PageContainer from '../../components/PageContainer';
import Card from '../../components/Card';
import PasswordInput from '../../components/settings/PasswordInput';

type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

export default function OrganiserRegister(): JSX.Element {
  const router = useRouter();
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const { mutate, isLoading, isError } = useMutation(
    (data: SignupRequest) => api.post('/api/user/register/evntorg', data),
    {
      onSuccess: () => {
        router.push('/register/success');
      },
    }
  );

  const onSubmit = async (data) => {
    mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <Head>
        <title>Join as Event Organiser</title>
      </Head>

      <NavBar />

      <PageContainer centerContent>
        <Grid maxW="sm" w="100%" h="200px" rowGap={2}>
          <Heading textAlign="center" size="lg" mt={4}>
            Create an acccount
          </Heading>

          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid rowGap={3}>
                <FormControl isInvalid={errors.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name"
                    ref={register({ required: 'Name is required' })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    ref={register({ required: 'Email is required' })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <PasswordInput
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    ref={register({
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must have at least 8 characters',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password_confirm}>
                  <FormLabel htmlFor="password_confirm">
                    Confirm Password
                  </FormLabel>
                  <PasswordInput
                    name="password_confirm"
                    id="password_confirm"
                    placeholder="Re-enter password"
                    ref={register({
                      validate: (value) =>
                        value === password.current || 'Passwords do not match',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password_confirm && errors.password_confirm.message}
                  </FormErrorMessage>
                </FormControl>

                <Button mt={2} type="submit" isLoading={isLoading}>
                  Submit
                </Button>

                {isError && (
                  <Alert status="error">
                    <AlertIcon />
                    An error occurred creating your account. Please try again.
                  </Alert>
                )}
              </Grid>
            </form>
          </Card>
        </Grid>
      </PageContainer>
    </>
  );
}
