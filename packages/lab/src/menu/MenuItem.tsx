import { ComponentPropsWithoutRef, forwardRef, Ref, SyntheticEvent, useState } from "react";
import { makePrefixer, useForkRef /*, useId */ } from "@salt-ds/core";
import { clsx } from "clsx";
import { useWindow } from "@salt-ds/window";
import { useComponentCssInjection } from "@salt-ds/styles";
import { useMenuContext } from "./MenuContext";

import menuItemCss from "./MenuItem.css";

const withBaseName = makePrefixer("saltMenuItem");

export const MenuItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function MenuItem(props, ref) {
  const { children, className, /*id: idProp, */ ...rest } = props;
  const [selected, setSelected] = useState<boolean>()

  const { refs, /*setActive, */ setOpen } = useMenuContext();
  // const id = useId(idProp);

  const targetWindow = useWindow();
  useComponentCssInjection({
    testId: "salt-menu-item",
    css: menuItemCss,
    window: targetWindow,
  });

  const handleRef = useForkRef(refs.setFloating, ref);

  // const handleMouseOver = () => {
  //   setActive(id);
  // };

  const handleMouseDown = () => {
    setSelected(true);
  };
  const handleClick = (event:SyntheticEvent) => {
    setOpen(event, false)
  };

  return (
    <div
      className={clsx(withBaseName(), {
        [withBaseName("selected")]: selected
      }, className)}
      ref={handleRef as Ref<HTMLDivElement>}
      role="menuitem"
      // onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </div>
  );
});
