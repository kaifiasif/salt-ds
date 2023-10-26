import { clsx } from "clsx";
import { ListNext, ListNextProps } from "../list-next";
import {
  makePrefixer,
  useId,
  useForkRef,
  useFloatingComponent,
} from "@salt-ds/core";
import { ChevronDownIcon, ChevronUpIcon } from "@salt-ds/icons";
import {
  useRef,
  forwardRef,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  Ref,
  ForwardedRef,
  SyntheticEvent,
  ComponentPropsWithoutRef,
  ReactElement,
} from "react";
import { useWindow } from "@salt-ds/window";
import dropdownNextCss from "./DropdownNext.css";
import { useComponentCssInjection } from "@salt-ds/styles";
import { Placement } from "@floating-ui/react";
import { useDropdownNext } from "./useDropdownNext";
import { ListItemNextType } from "../list-next/useList";

const withBaseName = makePrefixer("saltDropdownNext");

export interface DropdownNextProps<Item extends ListItemNextType>
  extends Omit<ComponentPropsWithoutRef<"button">, "onSelect" | "onChange"> {
  /**
   * If `true`, dropdown will be disabled.
   */
  disabled?: boolean;
  /**
   * Initially selected value for the dropdown, for use only in uncontrolled component.
   */
  defaultSelectedItem?: Item;
  /**
   * List of options when using a dropdown.
   */
  source: Item[];
  /**
   * If `true`, dropdown is read only.
   */
  readOnly?: boolean;
  /**
   * Background styling variant. Defaults to `primary` .
   */
  variant?: "primary" | "secondary";
  /**
   * Placement of dropdown list. Defaults to `bottom` .
   */
  placement?: Placement;
  /**
   * Optional ref for the list component.
   */
  listRef?: Ref<HTMLUListElement>;
  /**
   * Additional props for dropdown list.
   */
  ListProps?: ListNextProps<Item>;
  /* Status open or close for use in controlled component.  */
  open?: boolean;
  /**
   * Callback for list selection event
   */
  onSelect?: (event: SyntheticEvent, data: Item) => void;
  /**
   * Callback for list change event
   */
  onChange?: (event: SyntheticEvent, data: Item) => void;
  /**
  /* Selected prop for use in controlled component. */
  selectedItem?: Item | null;
  /* Highlighted item prop for use in controlled component. */
  highlightedIndex?: number | null;
}

export const DropdownNext = forwardRef(function DropdownNext<
  Item extends ListItemNextType
>(props: DropdownNextProps<Item>, ref: ForwardedRef<HTMLButtonElement>) {
  const {
    className,
    disabled,
    variant = "primary",
    id: dropdownIdProp,
    defaultSelectedItem,
    readOnly,
    source,
    placement = "bottom",
    open: openControlProp,
    selectedItem: selectedItemProp,
    highlightedIndex: highlightedIndexProp,
    onFocus,
    onKeyDown,
    onBlur,
    onMouseOver,
    onMouseDown,
    onSelect: onSelectProp,
    onChange: onChangeProp,
    listRef: listRefProp,
    ListProps,
    ...restProps
  } = props;

  const targetWindow = useWindow();
  useComponentCssInjection({
    testId: "salt-dropdown-next",
    css: dropdownNextCss,
    window: targetWindow,
  });

  const listId = useId(ListProps?.id);
  const dropdownId = useId(dropdownIdProp);
  const listRef = useRef<HTMLUListElement>(null);

  const setListRef = useForkRef(listRefProp, listRef);
  const listProps = {
    defaultSelectedItem,
    disabled,
    ref: listRef,
    id: listId,
    onSelect: onSelectProp,
    onChange: onChangeProp,
    selectedItem: selectedItemProp,
    highlightedIndex: highlightedIndexProp,
    source,
  };

  const {
    handlers,
    activeDescendant,
    selectedItem,
    highlightedIndex,
    portalProps,
    getItemValue,
  } = useDropdownNext({
    listProps,
    placement,
    openControlProp,
  });

  const { Component: FloatingComponent } = useFloatingComponent();

  const { open, floating, reference, getDropdownNextProps, getPosition } =
    portalProps;
  const {
    focusHandler,
    keyDownHandler,
    blurHandler,
    mouseOverHandler,
    mouseDownHandler,
  } = handlers;

  const triggerRef = useForkRef<HTMLButtonElement>(ref, reference);

  const getIcon = () => {
    if (readOnly) return;

    const iconClassName = clsx(withBaseName("icon"), {
      [withBaseName("disabled")]: disabled,
    });

    return open ? (
      <ChevronUpIcon className={iconClassName} />
    ) : (
      <ChevronDownIcon className={iconClassName} />
    );
  };

  const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
    if (disabled) return;
    focusHandler(event);
    onFocus?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || readOnly) return;
    keyDownHandler(event);
    onKeyDown?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
    blurHandler();
    onBlur?.(event);
  };

  const handleMouseOver = (event: MouseEvent<HTMLButtonElement>) => {
    mouseOverHandler();
    onMouseOver?.(event);
  };

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || readOnly) return;
    mouseDownHandler();
    onMouseDown?.(event);
  };

  const buttonValue = selectedItem ? getItemValue(selectedItem) : "";

  return (
    <div className={clsx(withBaseName())}>
      <button
        id={dropdownId}
        disabled={disabled}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onMouseOver={handleMouseOver}
        onMouseDown={handleMouseDown}
        onBlur={handleBlur}
        value={buttonValue}
        className={clsx(
          withBaseName("button"),
          withBaseName(variant),
          {
            [withBaseName("disabled")]: disabled,
            [withBaseName("readOnly")]: readOnly,
          },
          className
        )}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-activedescendant={activeDescendant}
        tabIndex={disabled ? -1 : 0}
        aria-owns={listId}
        aria-controls={listId}
        aria-disabled={disabled}
        {...restProps}
        ref={triggerRef}
      >
        <span className={clsx(withBaseName("buttonText"))}>{buttonValue}</span>
        {getIcon()}
      </button>
      <FloatingComponent
        open={open && !disabled}
        ref={floating}
        {...getDropdownNextProps()}
        {...getPosition()}
      >
        <ListNext
          id={listId}
          className={clsx(withBaseName("list"), ListProps?.className)}
          source={source}
          disabled={disabled || ListProps?.disabled}
          selectedItem={selectedItem}
          highlightedIndex={highlightedIndex}
          {...ListProps}
          ref={setListRef}
        />
      </FloatingComponent>
    </div>
  );
}) as <Item extends ListItemNextType>(
  props: DropdownNextProps<Item> & {
    ref?: ForwardedRef<HTMLButtonElement>;
  }
) => ReactElement<DropdownNextProps<Item>>;
