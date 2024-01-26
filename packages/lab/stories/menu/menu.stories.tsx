import { Button } from "@salt-ds/core";
import { Menu, MenuItem, MenuPanel, MenuTrigger, MenuProps } from "@salt-ds/lab";

import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Lab/Menu",
  component: Menu,
} as Meta<typeof Menu>;

export const Default: StoryFn<MenuProps> = () => {
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

export const Open: StoryFn<MenuProps> = () => {
  return (
    <Menu defaultOpen>
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
