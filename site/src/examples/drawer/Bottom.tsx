import { ReactElement, useState } from "react";

import { Drawer, DrawerCloseButton } from "@salt-ds/lab";
import { Button, FlexItem, FlowLayout, StackLayout } from "@salt-ds/core";
import { MultipleCards } from "../card";

export const Bottom = (): ReactElement => {
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
        style={{ height: 350 }}
      >
        <DrawerCloseButton onClick={handleClose} />
        <StackLayout>
          <h2 id={`${id}-header`}>Bottom drawer with master detail layout</h2>
          <FlowLayout>
            <MultipleCards />
            <MultipleCards />
            <MultipleCards />
          </FlowLayout>
          <FlexItem align="end">
            <Button onClick={handleClose}>Close Drawer</Button>
          </FlexItem>
        </StackLayout>
      </Drawer>
    </>
  );
};
