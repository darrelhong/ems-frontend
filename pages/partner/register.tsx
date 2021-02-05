import RoleEnum from '../../models/RoleEnum';

import RegisterPage from '../../components/RegisterPage';

export default function OrganiserRegister(): JSX.Element {
  return (
    <RegisterPage
      title={'Join as Business Partner'}
      registerApiUrl={`/api/user/register/${RoleEnum.BIZPTNR}`}
    />
  );
}
