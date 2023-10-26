/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { makePrefixer, useForkRef, useIdMemo } from "@salt-ds/core";
import { clsx } from "clsx";
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  useEffect,
  useRef,
} from "react";

import { useComponentCssInjection } from "@salt-ds/styles";
import { useWindow } from "@salt-ds/window";
import listItemNextCss from "./ListItemNext.css";
import { useListItem } from "./ListNextContext";
import { ListItemNextType } from "./useList";

const withBaseName = makePrefixer("saltListItemNext");

export interface ListItemNextProps<Item extends ListItemNextType>
  extends HTMLAttributes<HTMLLIElement> {
  /**
   * If true, the particular list item in list will be disabled.
   */
  disabled?: boolean;
  /**
   * List item id.
   */
  id?: string;
  /**
   * List item value.
   */
  value: Item;

  highlighted?: boolean;
  focusVisible?: boolean;
  selected?: boolean;
}

export const ListItemNext = forwardRef(function ListItemNext<
  Item extends ListItemNextType
>(
  {
    className,
    disabled,
    id: idProp,
    value,
    onClick,
    selected,
    highlighted,
    focusVisible,
    ...props
  }: ListItemNextProps<Item>,
  ref: ForwardedRef<HTMLLIElement>
) {
  const targetWindow = useWindow();
  useComponentCssInjection({
    testId: "salt-list-item-next",
    css: listItemNextCss,
    window: targetWindow,
  });
  const id = useIdMemo(idProp);

  const elementRef = useRef<HTMLLIElement>(null);
  const setRef = useForkRef(elementRef, ref);
  const listContext = useListItem();

  useEffect(() => {
    if (highlighted) {
      elementRef.current?.scrollIntoView({ block: "nearest" });
    }
  }, [highlighted]);

  if (!listContext) {
    // TODO: Warning

    return null;
  }
  const { select, highlight, getItemValue } = listContext;

  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    if (!disabled) {
      select(event, value);
      onClick?.(event);
    }
  };

  const handleMouseMove = (event: MouseEvent<HTMLLIElement>) => {
    if (!highlighted) {
      highlight(event, value);
    }
  };

  return (
    <li
      ref={setRef}
      className={clsx(
        withBaseName(),
        {
          [withBaseName("disabled")]: disabled,
          [withBaseName("highlighted")]: highlighted,
          [withBaseName("focused")]: focusVisible && highlighted,
        },
        className
      )}
      role="option"
      aria-disabled={disabled || undefined}
      aria-selected={selected || undefined}
      id={id}
      data-value={value}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {getItemValue(value)}
    </li>
  );
});
