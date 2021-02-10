import UpdateProfileForm from '../../../components/settings/UpdateProfileForm';
import SettingsWrapper from '../../../components/settings/SettingsWrapper';
import ChakraWrapper from '../../../components/ChakraWrapper';

export default function OrganiserSettings() {
  return (
    <ChakraWrapper>
      <SettingsWrapper>
        <UpdateProfileForm />
      </SettingsWrapper>
    </ChakraWrapper>
  );
}
