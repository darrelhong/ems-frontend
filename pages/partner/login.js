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

export default function PartnerLogin({ info }) {
  return (
    <ChakraWrapper>
      <LoginPage
        info={info}
        heading="Business Partner Login"
        loginApiUrl={`/api/user/login/${RoleEnum.BIZPTNR}`}
        loginSuccessUrl="/partner/home"
        registerUrl="/partner/register"
      />
    </ChakraWrapper>
  );
}

PartnerLogin.propTypes = {
  info: PropTypes.string,
};
