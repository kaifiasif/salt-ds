import { ReactElement, useState } from "react";

import { Drawer } from "@salt-ds/lab";
import { Button, FlexItem, FlowLayout, StackLayout } from "@salt-ds/core";
import styles from "./index.module.css";

const ArticleExample = () => (
  <StackLayout className={styles.articleContainer}>
    <div className={styles.articleImage} />
    <h3>Laborum in sit officia consecte</h3>
    <p>
      Do excepteur id ipsum qui dolor irure dolore commodo labore. Minim sunt
      aliquip eiusmod excepteur qui sunt commodo ex cillum ullamco. Quis magna
      deserunt reprehenderit anim elit laboris laboris fugiat Lorem est culpa
      quis.
    </p>
  </StackLayout>
);

export const BottomNoCloseButton = (): ReactElement => {
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
