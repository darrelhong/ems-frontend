// import RoleEnum from '../../models/RoleEnum';

// import RegisterPage from '../../components/RegisterPage';
// import ChakraWrapper from '../../components/ChakraWrapper';

// export default function OrganiserRegister() {
//   return (
//     <ChakraWrapper>
//       <RegisterPage
//         title="Join as Event Organiser"
//         registerApiUrl={`/api/user/register/${RoleEnum.EVNTORG}`}
//       />
//     </ChakraWrapper>
//   );
// }



import RoleEnum from '../../models/RoleEnum';

import RegisterEvnOrg from '../../components/registerEvnOrg';

export default function OrganiserRegister() {
  return (
      <RegisterEvnOrg
        title="Join as Event Organiser"
        registerApiUrl={`/api/user/register/${RoleEnum.EVNTORG}`}
      />
  );
}
