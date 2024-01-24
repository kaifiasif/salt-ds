import { FloatingContext, ReferenceType } from "@floating-ui/react";
import { createContext, useFloatingUI } from "@salt-ds/core";
import { SyntheticEvent, useContext } from "react";

type FloatingReturn = ReturnType<typeof useFloatingUI>;

export interface DrawerContextValue {
  // id: string;
  // position: string;
  // variant: "primary" | "secondary";
  openState: boolean;
  setOpen: (event: SyntheticEvent, newOpen: boolean) => void;
  // context: FloatingContext;
  reference?: (node: ReferenceType | null) => void;
  // floating?: (node: HTMLElement | null) => void;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  getReferenceProps: (
    userProps?: React.HTMLProps<Element> | undefined
  ) => Record<string, unknown>;
  // handleCloseButton: (event: SyntheticEvent) => void;
}

export const DrawerContext = createContext<DrawerContextValue>(
  "DrawerContext",
  {
    // id: "",
    // position: "left",
    // variant: "primary",
    openState: false,
    setOpen() {
      return undefined;
    },
    // // context: {} as FloatingContext,
    reference: {} as FloatingReturn["reference"],
    // // floating: {} as FloatingReturn["floating"],
    getFloatingProps() {
      return {} as Record<string, unknown>;
    },
    getReferenceProps() {
      return {} as Record<string, unknown>;
    },
    // handleCloseButton() {
    //   return undefined;
    // },
  }
);

export function useDrawerContext() {
  return useContext(DrawerContext);
}
