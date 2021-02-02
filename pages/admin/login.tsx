import { GetServerSideProps } from 'next';

import LoginPage from '../../components/LoginPage';

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
    <LoginPage
      info={info}
      heading="Admin Login"
      loginApiUrl={'/api/user/login/admin'}
      loginSuccessUrl={'/admin/home'}
    />
  );
}
