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
import RegisterPage from '../../components/RegisterEvnOrg';

export default function OrganiserRegister() {
  return (
    <RegisterPage
      title="Join as Event Organiser"
      registerApiUrl={`/api/${RoleEnum.EVNTORG}/register/`}
    />
    );

// import RegisterEvnOrg from '../../components/registerEvnOrg';

// export default function OrganiserRegister() {
//   return (
//       <RegisterEvnOrg
//         title="Join as Event Organiser"
//         registerApiUrl={`/api/user/register/${RoleEnum.EVNTORG}`}
//       />
// >>>>>>> upload-profilepic-frontend
//   );
}
