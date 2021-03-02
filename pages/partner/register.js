import RoleEnum from '../../models/RoleEnum';
import RegisterPage from '../../components/RegisterBusinessPartner';

//import RegisterPage from '../../components/RegisterPage';

export default function BusinessPartnerRegister() {
  return (
    <RegisterPage
      title="Join as Business Partner"
      // registerApiUrl={`/api/${RoleEnum.BIZPTNR}/register/`}
      registerApiUrl={`/api/partner/register`}

    />
  );
}
