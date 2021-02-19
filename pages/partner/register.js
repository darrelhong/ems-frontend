import RoleEnum from '../../models/RoleEnum';
import RegisterPage from '../../components/RegisterBusinessPartner';


export default function OrganiserRegister() {
  return (

      <RegisterPage
        title="Join as Business Partner"
        registerApiUrl={`/api/user/register/${RoleEnum.BIZPTNR}`}
      />

  );
}
