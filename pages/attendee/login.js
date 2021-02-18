import PropTypes from 'prop-types';

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
    <LoginPage
      info={info}
      heading="User Login"
      loginApiUrl={`/api/user/login/${RoleEnum.ATND}`}
      loginSuccessUrl="/attendee/home"
      registerUrl="/attendee/register"
    />
  );
}

PartnerLogin.propTypes = {
  info: PropTypes.string,
};
