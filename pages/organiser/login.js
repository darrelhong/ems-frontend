import PropTypes from 'prop-types';

//import ChakraWrapper from '../../components/ChakraWrapper';

import NewLoginPage from '../../components/NewLoginPage';
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

      <NewLoginPage
        info={info}
        heading="Event Organiser Login"
        loginApiUrl={`/api/user/login/${RoleEnum.EVNTORG}`}
        loginSuccessUrl="/organiser/home"
        registerUrl="/organiser/register"
      />
  );
}

OrganiserLogin.propTypes = {
  info: PropTypes.string,
};
