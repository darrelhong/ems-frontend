import { useRef } from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import api from '../../lib/ApiClient';

import Card from '../Card';
import PasswordInput from './PasswordInput';

type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export default function ChangePasswordForm(): JSX.Element {
  const { register, handleSubmit, errors, watch, reset } = useForm();
  const password = useRef({});
  password.current = watch('password_new', '');

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    (data: ChangePasswordRequest) =>
      api.post('/api/user/change-password', data),
    { onSettled: () => reset() }
  );

  const onSubmit = async (data) => {
    mutate({
      oldPassword: data.password_current,
      newPassword: data.password_new,
    });
  };

  return (
    <Card>
      <Text fontWeight="bold" fontSize="lg" mb={2}>
        Change password
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid rowGap={3}>
          <FormControl isInvalid={errors.password_current}>
            <FormLabel htmlFor="password_current">Current password</FormLabel>
            <PasswordInput
              name="password_current"
              id="password_current"
              ref={register({ required: 'Password is required' })}
              placeholder="Enter current passsword"
            />
            <FormErrorMessage>
              {errors.password_current && errors.password_current.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password_new}>
            <FormLabel htmlFor="password_new">New password</FormLabel>
            <PasswordInput
              name="password_new"
              id="password_new"
              ref={register({
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                },
              })}
              placeholder="Enter new password"
            />
            <FormErrorMessage>
              {errors.password_new && errors.password_new.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password_new_repeat}>
            <FormLabel htmlFor="password_new_repeat">
              Repeat new password
            </FormLabel>
            <PasswordInput
              name="password_new_repeat"
              id="password_new_repeat"
              ref={register({
                validate: (value) =>
                  value === password.current || 'Passwords do not match',
              })}
              placeholder="Enter new password"
            />
            <FormErrorMessage>
              {errors.password_new_repeat && errors.password_new_repeat.message}
            </FormErrorMessage>
          </FormControl>

          <GridItem>
            <Button mt={2} type="submit" isLoading={isLoading}>
              Submit
            </Button>
          </GridItem>

          {isError && (
            <Alert status="error">
              <AlertIcon />
              An error occurred, password is not changed.
            </Alert>
          )}
          {isSuccess && (
            <Alert status="success">
              <AlertIcon />
              Pasword succesfully updated!
            </Alert>
          )}
        </Grid>
      </form>
    </Card>
  );
}
