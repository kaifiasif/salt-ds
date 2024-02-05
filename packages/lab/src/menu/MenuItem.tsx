import {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactEventHandler,
  SyntheticEvent,
  KeyboardEvent,
} from "react";
import { makePrefixer } from "@salt-ds/core";
import { clsx } from "clsx";
import { useWindow } from "@salt-ds/window";
import { useComponentCssInjection } from "@salt-ds/styles";
import { useMenuContext } from "./MenuContext";

import menuItemCss from "./MenuItem.css";

const withBaseName = makePrefixer("saltMenuItem");

interface MenuItemProps extends ComponentPropsWithoutRef<"button"> {
  onClick?: ReactEventHandler;
  onKeyDown?: ReactEventHandler;
  disabled?: boolean;
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  function MenuItem(props, ref) {
    const { children, className, onClick, onKeyDown, disabled, ...rest } =
      props;

    const { setOpen } = useMenuContext();

    const targetWindow = useWindow();
    useComponentCssInjection({
      testId: "salt-menu-item",
      css: menuItemCss,
      window: targetWindow,
    });

    const handleClick = (event: SyntheticEvent) => {
      if (disabled) {
        return;
      }
      setOpen(event, false);
      onClick?.(event);
    };

    const handleOnKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setOpen(event, false);
      }
      onKeyDown?.(event);
    };
    return (
      <button
        className={clsx(withBaseName(), className)}
        ref={ref}
        role="menuitem"
        onClick={handleClick}
        onKeyDown={handleOnKeyDown}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
