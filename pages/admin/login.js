import PropTypes from 'prop-types';

import LoginPage from '../../components/LoginPage';
import ChakraWrapper from '../../components/ChakraWrapper';

import RoleEnum from '../../models/RoleEnum';

// get query params from URL to dispaly relavant feedback
export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      ...query,
    },
  };
};

export default function AdminLogin({ info }) {
  return (
    <ChakraWrapper>
      <LoginPage
        info={info}
        heading="Admin Login"
        loginApiUrl={`/api/user/login/${RoleEnum.ADMIN}`}
        loginSuccessUrl="/admin/home"
        registerUrl="#"
      />
    </ChakraWrapper>
  );
}

AdminLogin.propTypes = {
  info: PropTypes.string,
};
