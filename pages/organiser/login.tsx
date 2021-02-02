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

type OrganiserLoginProps = {
  info: string;
};

export default function OrganiserLogin({
  info,
}: OrganiserLoginProps): JSX.Element {
  return (
    <LoginPage
      info={info}
      heading="Organiser Login"
      loginApiUrl={'/api/user/login/evntorg'}
      loginSuccessUrl={'/organiser/home'}
    />
  );
}
