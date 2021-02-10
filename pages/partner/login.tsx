import { GetServerSideProps } from 'next';
import ChakraWrapper from '../../components/ChakraWrapper';

import LoginPage from '../../components/LoginPage';
import RoleEnum from '../../models/RoleEnum';

// get query params from URL to dispaly relavant feedback
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      ...query,
    },
  };
};

type PartnerLogin = {
  info: string;
};

export default function PartnerLogin({ info }: PartnerLogin): JSX.Element {
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
