import { Card, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import api from '../../lib/ApiClient';
import useUser from '../../lib/query/useUser';
import UserModel from '../../models/UserModel';

export default function UpdateProfileForm() {
  const { data: user, isLoading: userIsLoading, error: userError } = useUser(
    localStorage.getItem('userId')
  );

  if (userIsLoading) {
    return (
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="alert alert-danger" role="alert">
        An error has occured
      </div>
    );
  }

  return <ProfileForm user={user} />;
}

function ProfileForm({ user }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: { name: user.name },
  });

  const { mutate, isSuccess, isError } = useMutation(
    (data) => api.post('/api/user/update', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', user.id.toString()]);
      },
    }
  );

  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Account Details</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <form
            onSubmit={handleSubmit((data) => {
              mutate({
                ...data,
                id: user.id,
              });
            })}
          >
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
                  Submit
                </button>
              </Col>
            </Row>
          </form>

          {isError && (
            <div className="alert alert-danger mt-4 mb-0" role="alert">
              An error has occurred.
            </div>
          )}

          {isSuccess && (
            <div className="alert alert-success mt-4 mb-0" role="alert">
              Profile succesfully updated!
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

ProfileForm.propTypes = {
  user: UserModel,
};
