import { H2, Text, SaltProvider } from "@salt-ds/core";
import { Drawer, DrawerCloseButton } from "@salt-ds/lab";
import { StoryFn, Meta } from "@storybook/react";

import "./drawer.stories.css";

export default {
  title: "Lab/Drawer/Drawer QA",
  component: Drawer,
} as Meta<typeof Drawer>;

const DrawerTemplate: StoryFn<typeof Drawer> = ({
  position = "left",
  variant = "primary",
  style = {
    width: 300,
    height: 200,
  },
}) => {
  return (
    <Drawer
      open={true}
      position={position}
      variant={variant}
      style={{ animation: "unset", ...style }}
    >
      <DrawerCloseButton />
      <H2>Title</H2>
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum
      </Text>
    </Drawer>
  );
};

export const LeftRightDrawerLD: StoryFn = () => {
  return (
    <SaltProvider density="low">
      <DrawerTemplate position="left" style={{ width: 300 }} />
      <DrawerTemplate position="right" style={{ width: 300 }} />
    </SaltProvider>
  );
};
LeftRightDrawerLD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const LeftRightDrawerSecondaryLD: StoryFn = () => {
  return (
    <SaltProvider density="low">
      <DrawerTemplate
        position="left"
        variant="secondary"
        style={{ width: 300 }}
      />
      <DrawerTemplate
        position="right"
        variant="secondary"
        style={{ width: 300 }}
      />
    </SaltProvider>
  );
};
LeftRightDrawerSecondaryLD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const LeftRightDrawerMD: StoryFn = () => {
  return (
    <SaltProvider density="medium">
      <DrawerTemplate style={{ width: 300 }} />
      <DrawerTemplate position="right" style={{ width: 300 }} />
    </SaltProvider>
  );
};
LeftRightDrawerMD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const LeftRightDrawerSecondaryMD: StoryFn = () => {
  return (
    <SaltProvider density="medium">
      <DrawerTemplate
        position="left"
        variant="secondary"
        style={{ width: 300 }}
      />
      <DrawerTemplate
        position="right"
        variant="secondary"
        style={{ width: 300 }}
      />
    </SaltProvider>
  );
};
LeftRightDrawerMD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const LeftRightDrawerHD: StoryFn = () => {
  return (
    <SaltProvider density="high">
      <DrawerTemplate position="left" style={{ width: 300 }} />
      <DrawerTemplate position="right" style={{ width: 300 }} />
    </SaltProvider>
  );
};
LeftRightDrawerHD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const LeftRightDrawerSecondaryHD: StoryFn = () => {
  return (
    <SaltProvider density="high">
      <DrawerTemplate
        position="left"
        variant="secondary"
        style={{ width: 300 }}
      />
      <DrawerTemplate
        position="right"
        variant="secondary"
        style={{ width: 300 }}
      />
    </SaltProvider>
  );
};
LeftRightDrawerSecondaryHD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const LeftRightDrawerTD: StoryFn = () => {
  return (
    <SaltProvider density="touch">
      <DrawerTemplate position="left" style={{ width: 300 }} />
      <DrawerTemplate position="right" style={{ width: 300 }} />
    </SaltProvider>
  );
};
LeftRightDrawerTD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const LeftRightDrawerSecondaryTD: StoryFn = () => {
  return (
    <SaltProvider density="touch">
      <DrawerTemplate
        position="left"
        variant="secondary"
        style={{ width: 300 }}
      />
      <DrawerTemplate
        position="right"
        variant="secondary"
        style={{ width: 300 }}
      />
    </SaltProvider>
  );
};
LeftRightDrawerSecondaryTD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const TopBottomDrawerLD: StoryFn = () => {
  return (
    <SaltProvider density="low">
      <DrawerTemplate position="top" style={{ height: 200 }} />
      <DrawerTemplate position="bottom" style={{ height: 200 }} />
    </SaltProvider>
  );
};
TopBottomDrawerLD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const TopBottomDrawerSecondaryLD: StoryFn = () => {
  return (
    <SaltProvider density="low">
      <DrawerTemplate
        position="top"
        variant="secondary"
        style={{ height: 200 }}
      />
      <DrawerTemplate
        position="bottom"
        variant="secondary"
        style={{ height: 200 }}
      />
    </SaltProvider>
  );
};
TopBottomDrawerLD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const TopBottomDrawerMD: StoryFn = () => {
  return (
    <SaltProvider density="medium">
      <DrawerTemplate position="top" style={{ height: 200 }} />
      <DrawerTemplate position="bottom" style={{ height: 200 }} />
    </SaltProvider>
  );
};
TopBottomDrawerMD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const TopBottomDrawerSecondaryMD: StoryFn = () => {
  return (
    <SaltProvider density="medium">
      <DrawerTemplate
        position="top"
        variant="secondary"
        style={{ height: 200 }}
      />
      <DrawerTemplate
        position="bottom"
        variant="secondary"
        style={{ height: 200 }}
      />
    </SaltProvider>
  );
};
TopBottomDrawerMD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const TopBottomDrawerHD: StoryFn = () => {
  return (
    <SaltProvider density="high">
      <DrawerTemplate position="top" style={{ height: 200 }} />
      <DrawerTemplate position="bottom" style={{ height: 200 }} />
    </SaltProvider>
  );
};
TopBottomDrawerHD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const TopBottomDrawerSecondaryHD: StoryFn = () => {
  return (
    <SaltProvider density="high">
      <DrawerTemplate
        position="top"
        variant="secondary"
        style={{ height: 200 }}
      />
      <DrawerTemplate
        position="bottom"
        variant="secondary"
        style={{ height: 200 }}
      />
    </SaltProvider>
  );
};
TopBottomDrawerSecondaryHD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const TopBottomDrawerTD: StoryFn = () => {
  return (
    <SaltProvider density="touch">
      <DrawerTemplate position="top" style={{ height: 200 }} />
      <DrawerTemplate position="bottom" style={{ height: 200 }} />
    </SaltProvider>
  );
};
TopBottomDrawerTD.parameters = {
  chromatic: { disableSnapshot: false },
};

export const TopBottomDrawerSecondaryTD: StoryFn = () => {
  return (
    <SaltProvider density="touch">
      <DrawerTemplate
        position="top"
        variant="secondary"
        style={{ height: 200 }}
      />
      <DrawerTemplate
        position="bottom"
        variant="secondary"
        style={{ height: 200 }}
      />
    </SaltProvider>
  );
};
TopBottomDrawerTD.parameters = {
  chromatic: { disableSnapshot: false },
};
