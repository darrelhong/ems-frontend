import Head from 'next/head';

import { OrganiserNavBar, PartnerNavBar } from '../NavBar/NavBar';
import PageContainer from '../PageContainer';

type PageWrapperProps = {
  title: string;
  navbar: React.ReactNode;
  children: React.ReactNode;
};

function PageWrapper({
  title,
  navbar,
  children,
}: PageWrapperProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {navbar}

      <PageContainer>{children}</PageContainer>
    </>
  );
}

type RolePageWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export function OrganiserPageWrapper({
  ...props
}: RolePageWrapperProps): JSX.Element {
  return <PageWrapper {...props} navbar={<OrganiserNavBar />} />;
}

export function PartnerPageWrapper({
  ...props
}: RolePageWrapperProps): JSX.Element {
  return <PageWrapper {...props} navbar={<PartnerNavBar />} />;
}
