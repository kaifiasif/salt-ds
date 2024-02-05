import { Button } from "@salt-ds/core";
import { Menu, MenuTrigger, MenuPanel, MenuItem } from "@salt-ds/lab";

export const SingleLevelMenu = () => {
  return (
    <Menu>
      <MenuTrigger>
        <Button>Click</Button>
      </MenuTrigger>
      <MenuPanel>
        <MenuItem>One</MenuItem>
        <MenuItem>Two</MenuItem>
        <MenuItem>Three</MenuItem>
        <MenuItem>Four</MenuItem>
      </MenuPanel>
    </Menu>
  );
};
