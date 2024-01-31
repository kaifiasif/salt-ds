import {
  cloneElement,
  forwardRef,
  isValidElement,
  MouseEvent,
  ComponentPropsWithoutRef,
} from "react";
import { mergeProps, useForkRef } from "@salt-ds/core";
import { useMenuContext } from "./MenuContext";

export const MenuTrigger = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<"div">
>(function MenuTrigger(props, ref) {
  const { children } = props;

  const { refs, setOpen, openState } = useMenuContext();

  const triggerRef = useForkRef(ref, refs.setReference);

  if (!children || !isValidElement(children)) {
    return <></>;
  }

  const handleClick = (event: MouseEvent) => {
    setOpen(event, !openState);
  };

  return cloneElement(children, {
    ...mergeProps(
      {
        onClick: handleClick,
      },
      children.props
    ),
    ref: triggerRef,
  });
});
