import PropTypes from 'prop-types';

import ChakraWrapper from '../../components/ChakraWrapper';

import LoginPage from '../../components/LoginPage';
import RoleEnum from '../../models/RoleEnum';

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
    <ChakraWrapper>
      <LoginPage
        info={info}
        heading="Event Organiser Login"
        loginApiUrl={`/api/user/login/${RoleEnum.EVNTORG}`}
        loginSuccessUrl="/organiser/home"
        registerUrl="/organiser/register"
      />
    </ChakraWrapper>
  );
}

OrganiserLogin.propTypes = {
  info: PropTypes.string,
};
