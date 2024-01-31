import { ReactElement, useState } from "react";

import { Drawer, DrawerCloseButton } from "@salt-ds/lab";
import { Button, StackLayout } from "@salt-ds/core";

export const Default = (): ReactElement => {
  const [openPrimary, setOpenPrimary] = useState(false);
  const [openSecondary, setOpenSecondary] = useState(false);

  return (
    <StackLayout>
      <Button onClick={() => setOpenPrimary(true)}>Primary Drawer</Button>
      <Drawer
        open={openPrimary}
        onOpenChange={(newOpen) => setOpenPrimary(newOpen)}
        id="primary"
      >
        <DrawerCloseButton onClick={() => setOpenPrimary(false)} />
      </Drawer>
      <Button onClick={() => setOpenSecondary(true)}>Secondary Drawer</Button>
      <Drawer
        open={openSecondary}
        onOpenChange={(newOpen) => setOpenSecondary(newOpen)}
        variant="secondary"
        id="secondary"
      >
        <DrawerCloseButton onClick={() => setOpenSecondary(false)} />
      </Drawer>
    </StackLayout>
  );
};
