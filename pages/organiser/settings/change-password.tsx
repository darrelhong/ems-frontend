import ChakraWrapper from '../../../components/ChakraWrapper';
import ChangePasswordForm from '../../../components/settings/ChangePasswordForm';
import SettingsWrapper from '../../../components/settings/SettingsWrapper';

export default function OrganiserSettings(): JSX.Element {
  return (
    <ChakraWrapper>
      <SettingsWrapper>
        <ChangePasswordForm />
      </SettingsWrapper>
    </ChakraWrapper>
  );
}
