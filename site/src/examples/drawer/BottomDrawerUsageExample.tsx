import { ReactElement, useState } from "react";

import { Drawer, DrawerCloseButton } from "@salt-ds/lab";
import { Button, FlowLayout, StackLayout, H2 } from "@salt-ds/core";
import { MultipleCards } from "../card";

export const BottomDrawerUsageExample = (): ReactElement => {
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
      <Button onClick={handleRequestOpen}>Open Bottom Drawer</Button>
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        position="bottom"
        style={{ height: 350 }}
        id={id}
      >
        <DrawerCloseButton onClick={handleClose} />
        <StackLayout>
          <H2 id={`${id}-header`}>Bottom drawer usage example</H2>
          <FlowLayout>
            <MultipleCards />
            <MultipleCards />
            <MultipleCards />
          </FlowLayout>
        </StackLayout>
      </Drawer>
    </>
  );
};
