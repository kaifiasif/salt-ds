import { useControlled, useId, useIsFocusVisible } from "@salt-ds/core";
import {
  FocusEvent,
  KeyboardEvent,
  SyntheticEvent,
  useCallback,
  useMemo,
  useState,
} from "react";

export type ListItemNextType =
  | string
  | {
      value: string;
      disabled?: boolean;
    };

const defaultItemDisabledPredicate = <Item extends ListItemNextType>(
  value: Item
) => {
  if (typeof value === "string") {
    return false;
  } else {
    return Boolean(value.disabled);
  }
};

const defaultGetItemValue = (item: ListItemNextType): string => {
  if (typeof item === "string") {
    return item;
  }
  if (Object.prototype.hasOwnProperty.call(item, "value")) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    return String((item as any).value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  return (item as any).toString();
};

export interface UseListProps<Item extends ListItemNextType> {
  /** Data source used. It should be an array of objects or strings. */
  source: Item[];
  /**
   * If true, all items in list will be disabled.
   */
  disabled?: boolean;
  /* Highlighted index for when the list is controlled. Set to `null` to highlight nothing. */
  highlightedIndex?: number | null;
  /* Initial highlighted index when the list is uncontrolled. */
  defaultHighlightedIndex?: number;
  /* Selected item for when the list is controlled. Set to `null` to deselect. */
  selectedItem?: Item | null;
  /* Initial selected value when the list is uncontrolled. */
  defaultSelectedItem?: Item;
  /* Callback for change event. This is called when the selected value changes */
  onChange?: (e: SyntheticEvent, data: Item) => void;
  /* Callback for select event. This is called when any selection occurs, even if a previously selected value is selected again. */
  onSelect?: (e: SyntheticEvent, data: Item) => void;
  /* List id. */
  id?: string;
  /** Item value getter */
  getItemValue?: (item: Item) => string;
  /** Get item id from its index */
  getItemId?: (item: Item, index: number) => string;

  itemDisabled?: (item: Item) => boolean;
}

export const useList = <Item extends ListItemNextType>(
  props: UseListProps<Item>
) => {
  const generatedId = useId(props.id);

  const {
    source,
    disabled = false,
    highlightedIndex: highlightedIndexProp,
    defaultHighlightedIndex,
    selectedItem: selectedProp,
    defaultSelectedItem: defaultSelected,
    onChange,
    onSelect,
    id = generatedId,
    getItemId = (_, index) => `${id}-item-${index}`,
    getItemValue = defaultGetItemValue,
    itemDisabled = defaultItemDisabledPredicate,
  } = props;

  const [focusVisible, setFocusVisible] = useState(false);

  const [highlightedIndex, setHighlightedIndex] = useControlled({
    controlled: highlightedIndexProp,
    default: defaultHighlightedIndex,
    name: "ListNext",
    state: "highlightedIndex",
  });

  /** Id of the highlighted item */
  const activeDescendant =
    highlightedIndex === undefined || highlightedIndex === null
      ? undefined
      : getItemId(source[highlightedIndex], highlightedIndex);

  const [selectedItem, setSelectedItem] = useControlled({
    controlled: selectedProp,
    default: defaultSelected,
    name: "ListNext",
    state: "selected",
  });

  const getItemIndex = useCallback(
    (item: Item) => source.indexOf(item),
    [source]
  );

  const getItemAtIndex: (index: number | null | undefined) => Item | undefined =
    useCallback(
      (index) =>
        index === null || index === undefined ? undefined : source[index],
      [source]
    );

  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible<HTMLUListElement>();

  const selectItem = useCallback(
    (event: SyntheticEvent<HTMLElement>, item: Item) => {
      onSelect?.(event, item);
      if (item !== selectedItem) {
        onChange?.(event, item);
      }

      setSelectedItem(item);
      setHighlightedIndex(getItemIndex(item));
    },
    [
      getItemIndex,
      onChange,
      onSelect,
      selectedItem,
      setHighlightedIndex,
      setSelectedItem,
    ]
  );

  // CONTEXT CALLBACKS
  const select = useCallback(
    (event: SyntheticEvent<HTMLLIElement>, item: Item) => {
      selectItem(event, item);
    },
    [selectItem]
  );

  const highlight = useCallback(
    (_: SyntheticEvent<HTMLLIElement>, item: Item) => {
      setHighlightedIndex(getItemIndex(item));
    },
    [getItemIndex, setHighlightedIndex]
  );

  // HANDLERS
  const blurHandler = () => {
    handleBlurVisible();
    if (!isFocusVisibleRef.current) {
      setFocusVisible(false);
    }
  };

  const mouseOverHandler = () => {
    if (focusVisible) {
      setFocusVisible(false);
    }
  };

  // takes care of focus when using keyboard navigation
  const focusHandler = (event: FocusEvent<HTMLUListElement>) => {
    handleFocusVisible(event);
    if (isFocusVisibleRef.current) {
      setFocusVisible(true);
    }
    if (selectedItem) {
      setHighlightedIndex(getItemIndex(selectedItem));
    } else if (source.length > 0) {
      setHighlightedIndex(0);
    }
  };

  const highlightFirstAvailable = () => {
    if (source.length === 0) {
      setHighlightedIndex(null);
      return;
    }

    for (let index = 0; index < source.length; index++) {
      const item = source[index];
      if (item && !itemDisabled(item)) {
        setHighlightedIndex(index);
        return;
      }
    }
  };

  const highlightLastAvailable = () => {
    if (source.length === 0) {
      setHighlightedIndex(null);
      return;
    }

    for (let index = source.length - 1; index > -1; index--) {
      const item = source[index];
      if (item && !itemDisabled(item)) {
        setHighlightedIndex(index);
        return;
      }
    }
  };

  const highlightPrevious = (item: Item) => {
    const currentIndex = getItemIndex(item);
    if (currentIndex === -1) {
      highlightFirstAvailable();
    } else {
      for (let index = currentIndex - 1; index > -1; index--) {
        const item = source[index];
        if (item && !itemDisabled(item)) {
          setHighlightedIndex(index);
          return;
        }
      }
    }
  };

  const highlightNext = (item: Item) => {
    const currentIndex = getItemIndex(item);
    if (currentIndex === -1) {
      highlightFirstAvailable();
    } else {
      for (let index = currentIndex + 1; index < source.length; index++) {
        const item = source[index];
        if (item && !itemDisabled(item)) {
          setHighlightedIndex(index);
          return;
        }
      }
    }
  };

  // takes care of keydown when using keyboard navigation
  const keyDownHandler = (event: KeyboardEvent<HTMLElement>) => {
    const { key } = event;

    if (isFocusVisibleRef.current) {
      setFocusVisible(true);
    }

    const currentItem = getItemAtIndex(highlightedIndex);

    if (currentItem === undefined) return;

    switch (key) {
      case "ArrowUp":
        highlightPrevious(currentItem);
        event.preventDefault();
        break;
      case "ArrowDown":
        highlightNext(currentItem);
        event.preventDefault();
        break;
      case "Home":
        event.preventDefault();
        highlightFirstAvailable();
        break;
      case "End":
        event.preventDefault();
        highlightLastAvailable();
        break;
      case " ":
      case "Enter":
        event.preventDefault();
        const item = getItemAtIndex(highlightedIndex);
        if (item) {
          selectItem(event, item);
        }
        break;
      case "PageDown":
      case "PageUp":
        event.preventDefault();
        // TODO: move highlight a page
        break;
      default:
        break;
    }
  };

  // CONTEXT
  const contextValue = useMemo(() => {
    return {
      disabled,
      select,
      highlight,
      getItemValue,
    };
  }, [disabled, getItemValue, highlight, select]);

  return {
    id,
    focusHandler,
    keyDownHandler,
    blurHandler,
    mouseOverHandler,
    activeDescendant,
    selectedItem,
    highlightedIndex,
    setSelectedItem,
    setHighlightedIndex,
    contextValue,
    focusVisibleRef,
    getItemId,
    itemDisabled,
    focusVisible,
    getItemValue,
  };
};
