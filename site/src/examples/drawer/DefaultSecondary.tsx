import { ReactElement, useState } from "react";

import { Drawer, DrawerCloseButton } from "@salt-ds/lab";
import { Button } from "@salt-ds/core";

export const DefaultSecondary = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const id = "default-drawer";

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
        variant="secondary"
      >
        <h2 id={`${id}-header`}>Lorem ipsum</h2>
        <DrawerCloseButton onClick={handleClose} />
        <p id={`${id}-content`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nunc
          lacus, scelerisque ut elit nec, commodo blandit est. Duis mollis dui
          at nisl faucibus, id maximus urna pellentesque. Praesent consequat
          vulputate dolor, a mattis metus suscipit vitae. Donec ullamcorper,
          neque sit amet laoreet ornare, diam eros posuere metus, id consectetur
          tellus nisl id ipsum. Fusce sit amet cursus mauris, vel scelerisque
          enim. Quisque eu dolor tortor. Nulla facilisi. Vestibulum at neque sit
          amet neque facilisis porttitor a ac risus.Mauris consequat
          sollicitudin commodo. Vestibulum ac diam vulputate, condimentum purus
          non, eleifend erat. Nunc auctor iaculis mi eu hendrerit. Suspendisse
          potenti. Cras tristique vehicula iaculis. Morbi faucibus volutpat
          tellus, sit amet fringilla dui rhoncus a. Suspendisse nunc nulla,
          mattis sed commodo ac, cursus ut augue.
        </p>
      </Drawer>
    </>
  );
};
