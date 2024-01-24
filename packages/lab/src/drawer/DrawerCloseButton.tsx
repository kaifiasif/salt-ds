import { forwardRef } from "react";
import clsx from "clsx";
import { Button, ButtonProps, makePrefixer } from "@salt-ds/core";
import { useWindow } from "@salt-ds/window";
import { useComponentCssInjection } from "@salt-ds/styles";
import { CloseIcon } from "@salt-ds/icons";

import drawerCss from "./Drawer.css";

const withBaseName = makePrefixer("saltDrawer");

export const DrawerCloseButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function DrawerCloseButton({ className, ...rest }, ref) {
    const targetWindow = useWindow();
    useComponentCssInjection({
      testId: "salt-drawer-close-button",
      css: drawerCss,
      window: targetWindow,
    });

    return (
      <Button
        ref={ref}
        aria-label="Close Drawer"
        variant="secondary"
        className={clsx(withBaseName("closeButton"), className)}
        {...rest}
      >
        <CloseIcon aria-hidden />
      </Button>
    );
  }
);
