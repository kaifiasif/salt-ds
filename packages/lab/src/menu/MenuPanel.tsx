import { ComponentPropsWithoutRef, forwardRef, RefObject } from "react";
import { makePrefixer, useFloatingComponent, useForkRef } from "@salt-ds/core";
import { clsx } from "clsx";
import { useMenuContext } from "./MenuContext";
import { useWindow } from "@salt-ds/window";
import { useComponentCssInjection } from "@salt-ds/styles";
import menuPanelCss from "./MenuPanel.css";

const withBaseName = makePrefixer("saltMenuPanel");

export const MenuPanel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function MenuPanel(props, ref) {
  const { children, className, style, ...rest } = props;

  const targetWindow = useWindow();
  useComponentCssInjection({
    testId: "salt-menu-panel",
    css: menuPanelCss,
    window: targetWindow,
  });

  const { Component: FloatingComponent } = useFloatingComponent();

  const { openState, refs, floatingStyles } = useMenuContext();

  const handleRef = useForkRef(refs.setFloating, ref);

  return (
    <FloatingComponent
      top={0}
      left={0}
      position={"absolute"}
      open={openState}
      ref={handleRef as RefObject<HTMLDivElement>}
      style={{ ...floatingStyles, ...style }}
      className={clsx(withBaseName(), className)}
      {...rest} // {...getFloatingProps()}
    >
      {children}
    </FloatingComponent>
  );
});
