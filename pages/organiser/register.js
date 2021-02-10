import RoleEnum from '../../models/RoleEnum';

import RegisterPage from '../../components/RegisterPage';
import ChakraWrapper from '../../components/ChakraWrapper';

export default function OrganiserRegister() {
  return (
    <ChakraWrapper>
      <RegisterPage
        title="Join as Event Organiser"
        registerApiUrl={`/api/user/register/${RoleEnum.EVNTORG}`}
      />
    </ChakraWrapper>
  );
}
