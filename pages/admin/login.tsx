import { GetServerSideProps } from 'next';

import LoginPage from '../../components/LoginPage';
import ChakraWrapper from '../../components/ChakraWrapper';

import RoleEnum from '../../models/RoleEnum';

// get query params from URL to dispaly relavant feedback
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      ...query,
    },
  };
};

type AdminLoginProps = {
  info: string;
};

export default function AdminLogin({ info }: AdminLoginProps): JSX.Element {
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
