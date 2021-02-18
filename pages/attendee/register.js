import RoleEnum from '../../models/RoleEnum';
import RegisterPage from '../../components/RegisterAttendee';

export default function AttendeeRegister() {
  return (
    <RegisterPage
      title="Join as Participant"
      registerApiUrl={`/api/user/register/${RoleEnum.ATND}`}
    />
  );
}
