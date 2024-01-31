import {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactEventHandler,
  SyntheticEvent,
  useState,
} from "react";
import { makePrefixer } from "@salt-ds/core";
import { clsx } from "clsx";
import { useWindow } from "@salt-ds/window";
import { useComponentCssInjection } from "@salt-ds/styles";
import { useMenuContext } from "./MenuContext";

import menuItemCss from "./MenuItem.css";

const withBaseName = makePrefixer("saltMenuItem");

interface MenuItemProps extends ComponentPropsWithoutRef<"div"> {
  onClick?: ReactEventHandler;
  onMouseDown?: ReactEventHandler;
  disabled?: boolean;
}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  function MenuItem(props, ref) {
    const { children, className, onClick, onMouseDown, disabled, ...rest } =
      props;
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

    return (
      <div
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
        {...rest}
      >
        {children}
      </div>
    );
  }
);
