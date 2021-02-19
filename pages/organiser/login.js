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

export default function OrganiserLogin({ info }) {
  return (
    <LoginPage
      info={info}
      heading="Event Organiser Login"
      loginApiUrl="/api/user/login/evntorg"
      loginSuccessUrl="/organiser/home"
      registerUrl="/organiser/register"
    />
  );
}

OrganiserLogin.propTypes = {
  info: PropTypes.string,
};
