import { makePrefixer, useForkRef } from "@salt-ds/core";
import { useComponentCssInjection } from "@salt-ds/styles";
import { useWindow } from "@salt-ds/window";
import { clsx } from "clsx";
import {
  ComponentPropsWithoutRef,
  ComponentType,
  FocusEvent,
  ForwardedRef,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  Ref,
  forwardRef,
  useRef,
} from "react";
import { ListItemNext, ListItemNextProps } from "./ListItemNext";
import listNextCss from "./ListNext.css";
import { ListNextContext } from "./ListNextContext";
import { ListItemNextType, UseListProps, useList } from "./useList";

const withBaseName = makePrefixer("saltListNext");

export interface ListNextProps<Item extends ListItemNextType>
  extends Omit<
      ComponentPropsWithoutRef<"ul">,
      "onChange" | "onSelect" | "children"
    >,
    UseListProps<Item> {
  ListItem?: ComponentType<
    ListItemNextProps<Item> & { ref?: Ref<HTMLDivElement> }
  >;
  emptyPlaceholder?: ReactNode;
}

export const ListNext = forwardRef(function ListNext<
  Item extends ListItemNextType
>(
  {
    // hook props
    id: idProp,
    source = [],
    disabled,
    highlightedIndex: highlightedIndexProp,
    defaultHighlightedIndex,
    selectedItem: selectedProp,
    defaultSelectedItem: defaultSelectedItemProp,
    onChange,
    onSelect,
    getItemId: getItemIdProp,
    getItemValue: getItemValueProp,
    itemDisabled: itemDisabledProp,
    // Customization
    ListItem = ListItemNext,
    emptyPlaceholder: EmptyPlaceholder = "List is empty",
    // DOM attributes
    className,
    onFocus,
    onBlur,
    onKeyDown,
    onMouseOver,
    ...rest
  }: ListNextProps<Item>,
  ref: ForwardedRef<HTMLUListElement>
) {
  const targetWindow = useWindow();
  useComponentCssInjection({
    testId: "salt-list-next",
    css: listNextCss,
    window: targetWindow,
  });
  const listRef = useRef<HTMLUListElement>(null);
  const handleRef = useForkRef(listRef, ref);
  const {
    id: listId,
    focusHandler,
    keyDownHandler,
    blurHandler,
    mouseOverHandler,
    activeDescendant,
    selectedItem,
    highlightedIndex,
    contextValue,
    focusVisibleRef,
    getItemId,
    itemDisabled,
    focusVisible,
  } = useList({
    id: idProp,
    source,
    disabled,
    highlightedIndex: highlightedIndexProp,
    defaultHighlightedIndex,
    selectedItem: selectedProp,
    defaultSelectedItem: defaultSelectedItemProp,
    onChange,
    onSelect,
    getItemId: getItemIdProp,
    getItemValue: getItemValueProp,
    itemDisabled: itemDisabledProp,
  });

  const setListRef = useForkRef(focusVisibleRef, handleRef);

  const handleFocus = (event: FocusEvent<HTMLUListElement>) => {
    focusHandler(event);
    onFocus?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    keyDownHandler(event);
    onKeyDown?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLUListElement>) => {
    blurHandler();
    onBlur?.(event);
  };

  const handleMouseOver = (event: MouseEvent<HTMLUListElement>) => {
    mouseOverHandler();
    onMouseOver?.(event);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    <ListNextContext.Provider value={contextValue as any}>
      <ul
        ref={setListRef}
        id={listId}
        className={clsx(withBaseName(), className)}
        role="listbox"
        tabIndex={disabled ? -1 : 0}
        aria-activedescendant={disabled ? undefined : activeDescendant}
        aria-disabled={disabled}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onMouseOver={handleMouseOver}
        {...rest}
      >
        {source.length
          ? source.map((item, index) => (
              <ListItem
                key={getItemId(item, index)}
                id={getItemId(item, index)}
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                disabled={disabled || itemDisabled(item)}
                highlighted={highlightedIndex === index}
                value={item}
                selected={selectedItem === item}
                focusVisible={focusVisible}
              />
            ))
          : EmptyPlaceholder}
      </ul>
    </ListNextContext.Provider>
  );
}) as <Item extends ListItemNextType>(
  props: ListNextProps<Item> & {
    ref?: ForwardedRef<HTMLUListElement>;
  }
) => ReactElement<ListNextProps<Item>>;
