import { Meta, StoryFn } from "@storybook/react";
import { QAContainer, QAContainerProps } from "docs/components";
import { Button } from "@salt-ds/core";
import { Menu, MenuTrigger, MenuPanel, MenuItem } from "@salt-ds/lab";

export default {
  title: "Lab/Menu/Menu QA",
  component: Menu,
} as Meta;

export const AllExamples: StoryFn<QAContainerProps> = () => (
    <QAContainer itemPadding={12} transposeDensity>
      <Menu open>
        <MenuTrigger>
          <Button>Click</Button>
        </MenuTrigger>
        <MenuPanel>
          <MenuItem>One</MenuItem>
          <MenuItem disabled>Two</MenuItem>
          <MenuItem>Three</MenuItem>
          <MenuItem>Four</MenuItem>
        </MenuPanel>
      </Menu>
    </QAContainer>
);

AllExamples.parameters = {
  chromatic: { disableSnapshot: false },
};
