import PropTypes from 'prop-types';

import LoginPage from '../../components/LoginPage';

// get query params from URL to dispaly relavant feedback
export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      ...query,
    },
  };
};

export default function AttendeeLogin({ info }) {
  return (
    <LoginPage
      info={info}
      heading="Participant Login"
      loginApiUrl="/api/user/login/atnd"
      loginSuccessUrl="/attendee/home"
      registerUrl="/attendee/register"
    />
  );
}

AttendeeLogin.propTypes = {
  info: PropTypes.string,
};
