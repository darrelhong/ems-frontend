import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FaCog } from 'react-icons/fa';

import { logout } from '../../lib/auth';

function MenuButtonCog(): JSX.Element {
  return (
    <MenuButton
      as={IconButton}
      aria-label="Settings"
      icon={<FaCog />}
      variant="ghost"
      color="current"
    />
  );
}

export function AdminNavBarMenu(): JSX.Element {
  return (
    <Menu>
      <MenuButtonCog />
      <MenuList>
        <MenuItem onClick={() => logout({ redirectTo: '/admin/login' })}>
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export function OrganiserNavBarMenu(): JSX.Element {
  return (
    <Menu>
      <MenuButtonCog />
      <MenuList>
        <MenuItem onClick={() => logout({ redirectTo: '/organiser/login' })}>
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
