import RoleEnum from '../../models/RoleEnum';
import RegisterPage from '../../components/RegisterEvnOrg';

export default function OrganiserRegister() {
  return (
    <RegisterPage
      title="Join as Event Organiser"
      registerApiUrl={`/api/${RoleEnum.EVNTORG}/register/`}
    />
    );

}
