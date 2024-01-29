import { useState } from "react";
import {
  Button,
  FlexItem,
  FlexLayout,
  FlowLayout,
  FormField,
  FormFieldHelperText,
  FormFieldLabel,
  Input,
  StackLayout,
} from "@salt-ds/core";
import { Drawer, DrawerCloseButton } from "@salt-ds/lab";
import { Meta, StoryFn } from "@storybook/react";
import "./drawer.stories.css";

export default {
  title: "Lab/Drawer",
  component: Drawer,
} as Meta<typeof Drawer>;

const DrawerContent = ({
  id,
  handleClose,
}: {
  id?: string;
  handleClose: () => void;
}) => (
  <>
    <h2 id={`${id}-header`}>Lorem ipsum</h2>
    <DrawerCloseButton onClick={handleClose} />
    <p id={`${id}-content`}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nunc lacus,
      scelerisque ut elit nec, commodo blandit est. Duis mollis dui at nisl
      faucibus, id maximus urna pellentesque. Praesent consequat vulputate
      dolor, a mattis metus suscipit vitae. Donec ullamcorper, neque sit amet
      laoreet ornare, diam eros posuere metus, id consectetur tellus nisl id
      ipsum. Fusce sit amet cursus mauris, vel scelerisque enim. Quisque eu
      dolor tortor. Nulla facilisi. Vestibulum at neque sit amet neque facilisis
      porttitor a ac risus.Mauris consequat sollicitudin commodo. Vestibulum ac
      diam vulputate, condimentum purus non, eleifend erat. Nunc auctor iaculis
      mi eu hendrerit. Suspendisse potenti. Cras tristique vehicula iaculis.
      Morbi faucibus volutpat tellus, sit amet fringilla dui rhoncus a.
      Suspendisse nunc nulla, mattis sed commodo ac, cursus ut augue.
    </p>
  </>
);

const DrawerTemplate: StoryFn<typeof Drawer> = ({
  id,
  position = "left",
  ...args
}) => {
  const [open, setOpen] = useState(false);

  const handleRequestOpen = () => {
    setOpen(true);
  };

  const onOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleRequestOpen}>Open Drawer</Button>
      <Drawer
        {...args}
        open={open}
        onOpenChange={onOpenChange}
        id={id}
        position={position}
      >
        <DrawerContent id={id} handleClose={handleClose} />
      </Drawer>
    </>
  );
};

export const DefaultPrimary = DrawerTemplate.bind({});
DefaultPrimary.args = {
  id: "default-drawer",
};

export const DefaultSecondary = DrawerTemplate.bind({});
DefaultSecondary.args = {
  id: "default-drawer",
  variant: "secondary",
};

const FormFieldExample = () => (
  <FormField>
    <FormFieldLabel>Label</FormFieldLabel>
    <Input />
    <FormFieldHelperText>Help text appears here</FormFieldHelperText>
  </FormField>
);

export const TopFormField = () => {
  const [open, setOpen] = useState(false);
  const id = "top-drawer";

  const handleRequestOpen = () => {
    setOpen(true);
  };

  const onOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleRequestOpen}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={onOpenChange} id={id} position="top">
        <StackLayout>
          <h2 id={`${id}-header`}>Section title</h2>
          <DrawerCloseButton onClick={handleClose} />
          <p id={`${id}-content`}>
            Incididunt adipisicing deserunt nostrud ullamco consequat
            consectetur magna id do irure labore fugiat. Eiusmod pariatur
            officia elit ad. Ullamco adipisicing Lorem amet velit in do
            reprehenderit nostrud eu aute voluptate quis quis.
          </p>
          <FlexLayout>
            {Array.from({ length: 4 }, (_, index) => (
              <FormFieldExample key={index} />
            ))}
          </FlexLayout>
          <FlexItem align="end">
            <Button onClick={handleClose}>Close Drawer</Button>
          </FlexItem>
        </StackLayout>
      </Drawer>
    </>
  );
};

export const RightFormField = () => {
  const [open, setOpen] = useState(false);
  const id = "right-drawer";

  const handleRequestOpen = () => {
    setOpen(true);
  };

  const onOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleRequestOpen}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={onOpenChange} id={id} position="right">
        <StackLayout>
          <h2 id={`${id}-header`}>Section Title</h2>
          <DrawerCloseButton onClick={handleClose} />
          <p id={`${id}-content`}>
            Incididunt adipisicing deserunt nostrud ullamco consequat
            consectetur magna id do irure labore fugiat. Eiusmod pariatur
            officia elit ad. Ullamco adipisicing Lorem amet velit in do
            reprehenderit nostrud eu aute voluptate quis quis.
          </p>
          {Array.from({ length: 7 }, (_, index) => (
            <FormFieldExample key={index} />
          ))}
          <FlexItem align="end">
            <Button onClick={handleClose}>Close Drawer</Button>
          </FlexItem>
        </StackLayout>
      </Drawer>
    </>
  );
};

const ArticleExample = () => (
  <StackLayout className="drawer-article-container">
    <div className="drawer-article-image" />
    <h3>Laborum in sit officia consecte</h3>
    <p>
      Do excepteur id ipsum qui dolor irure dolore commodo labore. Minim sunt
      aliquip eiusmod excepteur qui sunt commodo ex cillum ullamco. Quis magna
      deserunt reprehenderit anim elit laboris laboris fugiat Lorem est culpa
      quis.
    </p>
  </StackLayout>
);

export const BottomNoCloseButton = () => {
  const [open, setOpen] = useState(false);
  const id = "bottom-drawer";

  const handleRequestOpen = () => {
    setOpen(true);
  };

  const onOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleRequestOpen}>Open Drawer</Button>
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        id={id}
        position="bottom"
        style={{ height: 500 }}
      >
        <StackLayout>
          <h2 id={`${id}-header`}>Section title</h2>
          <FlowLayout id={`${id}-content`}>
            {Array.from({ length: 3 }, (_, index) => (
              <ArticleExample key={index} />
            ))}
          </FlowLayout>
          <FlexItem align="end">
            <Button onClick={handleClose}>Close Drawer</Button>
          </FlexItem>
        </StackLayout>
      </Drawer>
    </>
  );
};
