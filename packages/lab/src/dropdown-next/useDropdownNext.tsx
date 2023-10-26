import {
  useInteractions,
  useDismiss,
  useRole,
  flip,
  shift,
  limitShift,
  offset,
  size,
} from "@floating-ui/react";
import {
  useControlled,
  useFloatingUI,
  UseFloatingUIProps,
} from "@salt-ds/core";
import { HTMLProps, KeyboardEvent, FocusEvent } from "react";
import { ListItemNextType, useList, UseListProps } from "../list-next/useList";

interface UseDropdownNextProps<Item extends ListItemNextType>
  extends Partial<
    Pick<UseFloatingUIProps, "onOpenChange" | "open" | "placement">
  > {
  listProps: UseListProps<Item>;
  // props for controlled dropdown
  openControlProp?: boolean;
}

export const useDropdownNext = <Item extends ListItemNextType>({
  listProps,
  openControlProp,
  onOpenChange: onOpenChangeProp,
  placement: placementProp,
}: UseDropdownNextProps<Item>) => {
  const [open, setOpen] = useControlled({
    controlled: openControlProp,
    default: false,
    name: "DropdownNext",
    state: "open",
  });

  // USELIST HOOK
  const {
    focusHandler: listFocusHandler,
    keyDownHandler: listKeyDownHandler,
    blurHandler: listBlurHandler,
    mouseOverHandler: listMouseOverHandler,
    activeDescendant,
    selectedItem,
    setSelectedItem,
    highlightedIndex,
    focusVisibleRef,
    getItemValue,
  } = useList(listProps);

  // FLOATING PORTAL
  const onOpenChange = (open: boolean) => {
    setOpen(open);
    onOpenChangeProp?.(open);
  };

  const { floating, reference, x, y, strategy, placement, context, elements } =
    useFloatingUI({
      open,
      onOpenChange,
      placement: placementProp,
      middleware: [
        offset(0),
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
        }),
        flip(),
        shift({ limiter: limitShift() }),
      ],
    });

  const { getFloatingProps } = useInteractions([
    useDismiss(context),
    useRole(context, { role: "listbox" }),
  ]);

  const getDropdownNextProps = (): HTMLProps<HTMLDivElement> => {
    return getFloatingProps({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      "data-placement": placement,
      ref: floating,
    });
  };

  const getPosition = () => ({
    top: y ?? 0,
    left: x ?? 0,
    position: strategy,
    width: elements.floating?.clientWidth,
    height: elements.floating?.clientHeight,
  });

  // HANDLERS
  const blurHandler = () => {
    listBlurHandler();
    setOpen(false);
  };

  // handles focus on mouse and keyboard
  const focusHandler = (event: FocusEvent<HTMLElement>) => {
    listFocusHandler(event as FocusEvent<HTMLUListElement>);
  };

  // handles mouse click on dropdown button
  const mouseDownHandler = () => {
    setOpen(!open);
  };

  // handles mouse hover on dropdown button
  const mouseOverHandler = () => {
    listMouseOverHandler();
  };

  const keyDownHandler = (event: KeyboardEvent<HTMLElement>) => {
    const { key } = event;
    switch (key) {
      case "ArrowUp":
        if (open) {
          listKeyDownHandler(event);
        }
        break;
      case "ArrowDown":
        if (!open) {
          setOpen(true);
        } else {
          listKeyDownHandler(event);
        }
        break;
      case " ":
      case "Enter":
        if (!open) {
          setOpen(true);
          break;
        }
        if (open) {
          listKeyDownHandler(event);
          setOpen(false);
          break;
        }
        break;
      case "Escape":
        setOpen(false);
        break;
      case "PageUp":
      case "PageDown":
      case "Home":
      case "End":
        if (open) {
          listKeyDownHandler(event);
          break;
        }
        break;
      default:
        break;
    }
  };

  return {
    handlers: {
      focusHandler,
      keyDownHandler,
      blurHandler,
      mouseOverHandler,
      mouseDownHandler,
    },
    activeDescendant,
    selectedItem,
    setSelectedItem,
    highlightedIndex,
    focusVisibleRef,
    getItemValue,
    portalProps: {
      open,
      setOpen,
      floating,
      reference,
      getDropdownNextProps,
      getPosition,
    },
  };
};
