import RoleEnum from '../../models/RoleEnum';

import RegisterPage from '../../components/registerEvnOrg';
import ChakraWrapper from '../../components/ChakraWrapper';

export default function OrganiserRegister() {
  return (
    <ChakraWrapper>
      <RegisterPage
        title="Join as Business Partner"
        registerApiUrl={`/api/user/register/${RoleEnum.BIZPTNR}`}
      />
    </ChakraWrapper>
  );
}
