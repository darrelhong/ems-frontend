import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaCog } from 'react-icons/fa';
import Cookies from 'js-cookie';

export function AdminNavBarMenu(): JSX.Element {
  const router = useRouter();
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Settings"
        icon={<FaCog />}
        variant="ghost"
        color="current"
      />
      <MenuList>
        <MenuItem
          onClick={() => {
            Cookies.remove('token');
            router.push('/admin/login');
          }}
        >
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
