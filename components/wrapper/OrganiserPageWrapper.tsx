import Head from 'next/head';
import { OrganiserNavBar } from '../NavBar/NavBar';
import PageContainer from '../PageContainer';

type OrganiserPageWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export default function OrganiserPageWrapper({
  title,
  children,
}: OrganiserPageWrapperProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <OrganiserNavBar />

      <PageContainer>{children}</PageContainer>
    </>
  );
}
