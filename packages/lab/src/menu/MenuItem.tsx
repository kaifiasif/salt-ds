import {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactEventHandler,
  Ref,
  SyntheticEvent,
  useState,
} from "react";
import { makePrefixer, useForkRef } from "@salt-ds/core";
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

    const { refs, setOpen } = useMenuContext();

    const targetWindow = useWindow();
    useComponentCssInjection({
      testId: "salt-menu-item",
      css: menuItemCss,
      window: targetWindow,
    });

    const handleRef = useForkRef(refs.setFloating, ref);

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
        ref={handleRef as Ref<HTMLDivElement>}
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
