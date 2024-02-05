import {
  ComponentPropsWithoutRef,
  CSSProperties,
  forwardRef,
  SyntheticEvent,
  useMemo,
} from "react";
import { MenuContext } from "./MenuContext";
import { useControlled, useFloatingUI } from "@salt-ds/core";
import { flip, offset, shift, limitShift, Placement } from "@floating-ui/react";

export interface MenuProps extends ComponentPropsWithoutRef<"div"> {
  open?: boolean;
  defaultOpen?: boolean;
  placement?: Placement;
  onOpenChange?: (event: SyntheticEvent, newOpen: boolean) => void;
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu(
  props,
  ref
) {
  const {
    children,
    defaultOpen,
    open,
    placement = "bottom-start",
    onOpenChange,
    ...rest
  } = props;

  const [openState, setOpenState] = useControlled({
    controlled: open,
    default: Boolean(defaultOpen),
    name: "Menu",
    state: "open",
  });

  const setOpen = (event: SyntheticEvent, newOpen: boolean) => {
    setOpenState(newOpen);
    onOpenChange?.(event, newOpen);
  };

  const {context, x, y, strategy, elements, refs } = useFloatingUI({
    open,
    placement,
    middleware: [offset(0), flip({}), shift({ limiter: limitShift() })],
  });

  const floatingStyles: CSSProperties = useMemo(() => {
    return (
      elements.floating ? { position: strategy, top: y, left: x } : {}
    ) as CSSProperties;
  }, [elements.floating, strategy, x, y]);
  
  return (
    <MenuContext.Provider
      value={{
        context,
        openState,
        setOpen,
        strategy, 
        y, 
        x,
        refs,
        placement,
        floatingStyles
      }}
    >
      <div ref={ref} {...rest}>
        {children}
      </div>
    </MenuContext.Provider>
  );
});
