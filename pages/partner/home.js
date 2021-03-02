// import { Heading, Skeleton, Text } from '@chakra-ui/react';

// import useUser from '../../lib/query/useUser';

// import { PartnerPageWrapper } from '../../components/wrapper/PageWrapper';
// import withProtectRoute from '../../components/ProtectRouteWrapper';
// import ChakraWrapper from '../../components/ChakraWrapper';

// function PartnerHome() {
//   const { data: user, isLoading, isSuccess } = useUser(
//     localStorage.getItem('userId')
//   );
//   return (
//     <ChakraWrapper>
//       <PartnerPageWrapper title="Partner Dashboard">
//         <Heading>Partner Home</Heading>
//         {isLoading && <Skeleton height="40px" />}
//         {isSuccess && (
//           <>
//             <Text>Name: {user?.name}</Text>
//             <Text>User ID: {user?.id}</Text>
//           </>
//         )}
//       </PartnerPageWrapper>
//     </ChakraWrapper>
//   );
// }

// export default withProtectRoute(PartnerHome, {
//   redirectTo: '/partner/login',
// });


import Link from 'next/link';
import { Container } from 'react-bootstrap';

import useUser from '../../lib/query/useUser';

import { BreadcrumbOne } from '../../components/Breadcrumb';
import PartnerWrapper from '../../components/wrapper/PartnerWrapper';

export default function PartnerHome() {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
    <PartnerWrapper title="Partner Home">
      <BreadcrumbOne pageTitle={"Welcome " + user?.name} >
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/partner/home">
              <a>Home</a>
            </Link>
          </li>
        </ol>
      </BreadcrumbOne>

      <Container>
        {isLoading && <div className="spinner-grow" role="status" />}
        {isSuccess && (
          <>
            <p>{user?.name}</p>
            <p>User ID: {user?.id}</p>
            <p>{user?.name}</p>
            <p>User ID: {user?.id}</p>
            <p>{user?.name}</p>
            <p>User ID: {user?.id}</p>
            <p>{user?.name}</p>
            <p>User ID: {user?.id}</p>
            <p>{user?.name}</p>
            <p>User ID: {user?.id}</p>
          </>
        )}
      </Container>
    </PartnerWrapper>
  );
}
