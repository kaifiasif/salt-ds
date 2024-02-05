import { FloatingContext, Placement, Strategy } from "@floating-ui/react";
import { createContext, useFloatingUI } from "@salt-ds/core";
import { CSSProperties, SyntheticEvent, useContext } from "react";

type FloatingReturn = ReturnType<typeof useFloatingUI>;

export interface MenuContextValue {
  openState: boolean;
  setOpen: (event: SyntheticEvent, newOpen: boolean) => void;
  refs: FloatingReturn["refs"];
  context: FloatingContext;
  placement: Placement;
  strategy: Strategy;
  x: number;
  y: number;
  floatingStyles: CSSProperties;
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
  context: {} as FloatingContext,
  x: 0,
  y: 0,
  strategy: "" as Strategy,
  floatingStyles: {
    top: 0,
    left: 0,
    position: "" as Strategy,
  },
  placement: "bottom-start",
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
