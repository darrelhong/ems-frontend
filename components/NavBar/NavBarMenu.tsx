import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FaCog } from 'react-icons/fa';

import { logout } from '../../lib/auth';

export function AdminNavBarMenu(): JSX.Element {
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
        <MenuItem onClick={logout}>Log out</MenuItem>
      </MenuList>
    </Menu>
  );
}
