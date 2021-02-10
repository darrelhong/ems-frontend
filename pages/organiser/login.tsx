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

type OrganiserLoginProps = {
  info: string;
};

export default function OrganiserLogin({
  info,
}: OrganiserLoginProps): JSX.Element {
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
