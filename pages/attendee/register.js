import RegisterPage from '../../components/RegisterAttendee';

export default function AttendeeRegister() {
  return (
    <RegisterPage
      title="Join as Participant"
      registerApiUrl="/api/attendee/register"
    />
  );
}
