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

export default function PartnerLogin({ info }) {
  return (
    <LoginPage
      info={info}
      heading="Business Partner Login"
      loginApiUrl="/api/user/login/bizptnr"
      loginSuccessUrl="/partner/home"
      registerUrl="/partner/register"
    />
  );
}

PartnerLogin.propTypes = {
  info: PropTypes.string,
};
