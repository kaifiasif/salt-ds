import { ReactElement, useState } from "react";

import { Drawer, DrawerCloseButton } from "@salt-ds/lab";
import { Button, FlexItem, FlowLayout, StackLayout, H2 } from "@salt-ds/core";
import { MultipleCards } from "../card";

export const BottomUseCase = (): ReactElement => {
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
      <Button onClick={handleRequestOpen}>Bottom Drawer</Button>
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        position="bottom"
        style={{ height: 350 }}
        id="bottom"
      >
        <DrawerCloseButton onClick={handleClose} />
        <StackLayout>
          <H2>Bottom drawer use case</H2>
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
