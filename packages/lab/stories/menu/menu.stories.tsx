import { Button, FlexLayout } from "@salt-ds/core";
import {
  Menu,
  MenuItem,
  MenuPanel,
  MenuTrigger,
  MenuProps,
  MenuGroup,
} from "@salt-ds/lab";

import { Meta, StoryFn } from "@storybook/react";
import { TailsIcon } from "@salt-ds/icons";
import { useState } from "react";

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

export const Controlled: StoryFn<MenuProps> = () => {
  const [open, setOpen] = useState<boolean>();

  const toggleOpen = () => {
    setOpen((current) => !current);
  };

  return (
    <FlexLayout direction="column">
      <Button onClick={toggleOpen}>{open ? "Close menu" : "Open menu"}</Button>

      <Menu defaultOpen={false} open={open}>
        <MenuTrigger>
          <Button>Click</Button>
        </MenuTrigger>
        <MenuPanel>
          <MenuItem>One</MenuItem>
          <MenuItem><TailsIcon />Two</MenuItem>
          <MenuGroup label="Group label">
            <MenuItem>Three</MenuItem>
            <MenuItem disabled>Four</MenuItem>
          </MenuGroup>
        </MenuPanel>
      </Menu>
    </FlexLayout>
  );
};
