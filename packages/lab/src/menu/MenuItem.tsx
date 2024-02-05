import {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactEventHandler,
  SyntheticEvent,
  KeyboardEvent,
  useState,
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
  onMouseDown?: ReactEventHandler;
  onKeyDown?: ReactEventHandler;
  disabled?: boolean;
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  function MenuItem(props, ref) {
    const {
      children,
      className,
      onClick,
      onKeyDown,
      onMouseDown,
      disabled,
      ...rest
    } = props;
    const [selected, setSelected] = useState<boolean>();

    const { setOpen } = useMenuContext();

    const targetWindow = useWindow();
    useComponentCssInjection({
      testId: "salt-menu-item",
      css: menuItemCss,
      window: targetWindow,
    });

    const handleMouseDown = (event: SyntheticEvent) => {
      if (disabled) {
        return;
      }
      setSelected(true);
      onMouseDown?.(event);
    };
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
        className={clsx(
          withBaseName(),
          {
            [withBaseName("selected")]: selected,
            [withBaseName("disabled")]: disabled,
          },
          className
        )}
        ref={ref}
        role="menuitem"
        onMouseDown={handleMouseDown}
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
