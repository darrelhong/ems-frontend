import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import api from '../../lib/ApiClient';
import useUser from '../../lib/query/useUser';
import UserModel from '../../models/UserModel';

import Card from '../Card';

export default function UpdateProfileForm() {
  const { data: user, isLoading: userIsLoading, error: userError } = useUser(
    localStorage.getItem('userId')
  );

  if (userIsLoading) {
    return <Skeleton h="100px" />;
  }

  if (userError) {
    return (
      <GridItem>
        <Alert status="error">
          <AlertIcon />
          An error has occured.
        </Alert>
      </GridItem>
    );
  }

  return <ProfileForm user={user} />;
}

function ProfileForm({ user }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { name: user.name },
  });

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    (data) => api.post('/api/user/update', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', user.id.toString()]);
      },
    }
  );

  const onSubmit = async (data) => {
    mutate({
      ...data,
      id: user.id,
    });
  };

  return (
    <Card>
      <Text fontWeight="bold" fontSize="lg" mb={2}>
        Update Profile
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid rowGap={3}>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              name="name"
              id="name"
              ref={register({ required: 'Name is required' })}
              placeholder="Enter name"
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
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
              An error has occurred.
            </Alert>
          )}
          {isSuccess && (
            <Alert status="success">
              <AlertIcon />
              Profile succesfully updated!
            </Alert>
          )}
        </Grid>
      </form>
    </Card>
  );
}

ProfileForm.propTypes = {
  user: UserModel,
};
