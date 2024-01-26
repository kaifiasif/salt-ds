import { ReactElement, useState } from "react";

import { Drawer, DrawerCloseButton } from "@salt-ds/lab";
import {
  Button,
  FlexItem,
  FlexLayout,
  FormField,
  FormFieldHelperText,
  FormFieldLabel,
  Input,
  StackLayout,
} from "@salt-ds/core";

const FormFieldExample = () => (
  <FormField>
    <FormFieldLabel>Label</FormFieldLabel>
    <Input />
    <FormFieldHelperText>Help text appears here</FormFieldHelperText>
  </FormField>
);

export const TopWithFormField = (): ReactElement => {
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
