import { ReactElement, useState } from "react";

import { Drawer, DrawerCloseButton } from "@salt-ds/lab";
import { Button, StackLayout } from "@salt-ds/core";

export const Position = (): ReactElement => {
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [openTop, setOpenTop] = useState(false);
  const [openBottom, setOpenBottom] = useState(false);

  return (
    <StackLayout>
      <Button onClick={() => setOpenLeft(true)}>Left Drawer</Button>
      <Drawer
        open={openLeft}
        onOpenChange={(newOpen) => setOpenLeft(newOpen)}
        id="left"
        style={{ width: 200 }}
      >
        <DrawerCloseButton onClick={() => setOpenLeft(false)} />
      </Drawer>
      <Button onClick={() => setOpenRight(true)}>Right Drawer</Button>
      <Drawer
        open={openRight}
        onOpenChange={(newOpen) => setOpenRight(newOpen)}
        position="right"
        id="right"
        style={{ width: 200 }}
      >
        <DrawerCloseButton onClick={() => setOpenRight(false)} />
      </Drawer>
      <Button onClick={() => setOpenTop(true)}>Top Drawer</Button>
      <Drawer
        open={openTop}
        onOpenChange={(newOpen) => setOpenTop(newOpen)}
        position="top"
        id="top"
        style={{ height: 200 }}
      >
        <DrawerCloseButton onClick={() => setOpenTop(false)} />
      </Drawer>
      <Button onClick={() => setOpenBottom(true)}>Bottom Drawer</Button>
      <Drawer
        open={openBottom}
        onOpenChange={(newOpen) => setOpenBottom(newOpen)}
        position="bottom"
        id="bottom"
        style={{ height: 200 }}
      >
        <DrawerCloseButton onClick={() => setOpenBottom(false)} />
      </Drawer>
    </StackLayout>
  );
};
