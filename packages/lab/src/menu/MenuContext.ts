import {
  Placement,
  Strategy,
} from "@floating-ui/react";
import { createContext, useFloatingUI } from "@salt-ds/core";
import { CSSProperties, SyntheticEvent, useContext } from "react";

type FloatingReturn = ReturnType<typeof useFloatingUI>;

export interface MenuContextValue {
  openState: boolean;
  setOpen: (event: SyntheticEvent, newOpen: boolean) => void;
  floatingStyles: CSSProperties;
  refs: FloatingReturn["refs"];
  placement: Placement;
  getFloatingProps?: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  getReferenceProps?: (
    userProps?: React.HTMLProps<Element> | undefined
  ) => Record<string, unknown>;
}

export const MenuContext = createContext<MenuContextValue>("MenuContext", {
  openState: false,
  setOpen() {
    return undefined;
  },
  floatingStyles: {
    top: 0,
    left: 0,
    position: "" as Strategy,
  },
  placement: 'bottom-start',
  refs: {} as FloatingReturn["refs"],
  getFloatingProps() {
    return {} as Record<string, unknown>;
  },
  getReferenceProps() {
    return {} as Record<string, unknown>;
  },
});

export function useMenuContext() {
  return useContext(MenuContext);
}
