import {
  Button,
  FlexLayout,
  Input,
  ToggleButton,
  ToggleButtonGroup,
} from "@salt-ds/core";
import { ArrowDownIcon, ArrowUpIcon } from "@salt-ds/icons";
import { Meta, StoryFn } from "@storybook/react";
import {
  ChangeEvent,
  KeyboardEvent,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";
import { ListItemNextType, ListNext, ListNextProps } from "../../src";
import { usStateExampleData } from "../assets/exampleData";

export default {
  title: "Lab/List Next",
  component: ListNext,
} as Meta<typeof ListNext>;

export const Default: StoryFn<ListNextProps<string>> = ({
  onChange,
  ...rest
}) => {
  const itemDisabled = useCallback(
    (item: string) =>
      [usStateExampleData[1], usStateExampleData[5]].includes(item),
    []
  );
  return (
    <ListNext
      aria-label="List example"
      style={{ height: "150px", width: 300 }}
      onChange={(e, value) => {
        console.log("new selection", value);
        onChange?.(e, value);
      }}
      itemDisabled={itemDisabled}
      {...rest}
    />
  );
};

Default.args = {
  source: usStateExampleData,
};

export const ObjectAsSource: StoryFn<ListNextProps<ListItemNextType>> = ({
  onChange,
  ...rest
}) => {
  return (
    <ListNext
      aria-label="List example"
      style={{ height: "150px", width: 300 }}
      onChange={(e, value) => {
        console.log("new selection", value);
        onChange?.(e, value);
      }}
      {...rest}
    />
  );
};
ObjectAsSource.args = {
  source: usStateExampleData.map((s, index) => ({
    value: s,
    disabled: [1, 5].includes(index),
  })),
};

export const Controlled: StoryFn<ListNextProps<string>> = ({
  onChange,
  ...rest
}) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [controls, setControls] = useState<string>("buttons");
  const [inputValue, setInputValue] = useState("");

  const handleArrowDown = () => {
    setHighlightedIndex(
      Math.min(highlightedIndex + 1, usStateExampleData.length - 1)
    );
  };

  const handleArrowUp = () => {
    setHighlightedIndex(Math.max(0, highlightedIndex - 1));
  };

  const handleSelect = () => {
    setSelectedItem(usStateExampleData[highlightedIndex]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    setInputValue(event.target.value);
    const firstMatchingIndex = usStateExampleData.findIndex((item) =>
      item.toLowerCase().includes(inputValue)
    );
    setHighlightedIndex(firstMatchingIndex === -1 ? 0 : firstMatchingIndex);
    setSelectedItem(
      firstMatchingIndex === -1 ? null : usStateExampleData[firstMatchingIndex]
    );
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    switch (key) {
      case "ArrowUp":
        event.preventDefault();
        handleArrowUp();
        break;
      case "ArrowDown":
        event.preventDefault();
        handleArrowDown();
        break;
      case " ":
      case "Enter":
        event.preventDefault();
        handleSelect();
        break;
      default:
        break;
    }
  };
  return (
    <FlexLayout
      direction="column"
      gap={1}
      align={"center"}
      style={{ height: "260px" }}
    >
      <ToggleButtonGroup
        aria-label="Controls"
        value={controls}
        onChange={(event: SyntheticEvent<HTMLButtonElement>) =>
          setControls(event.currentTarget.value)
        }
      >
        <ToggleButton aria-label="Button controls" value="buttons">
          buttons
        </ToggleButton>
        <ToggleButton aria-label="Input controls" value="input">
          input
        </ToggleButton>
      </ToggleButtonGroup>
      {controls === "buttons" ? (
        <FlexLayout gap={0}>
          <Button
            disabled={highlightedIndex === usStateExampleData.length - 1}
            onClick={handleArrowDown}
          >
            <ArrowDownIcon />
          </Button>
          <Button
            disabled={!highlightedIndex || highlightedIndex === 0}
            onClick={handleArrowUp}
          >
            <ArrowUpIcon />
          </Button>
          <Button
            disabled={highlightedIndex === undefined}
            onClick={handleSelect}
          >
            Select
          </Button>
        </FlexLayout>
      ) : (
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        ></Input>
      )}
      <ListNext
        {...rest}
        aria-label="Controlled List example"
        selectedItem={selectedItem}
        highlightedIndex={highlightedIndex}
        onChange={(e, item) => {
          console.log("new selection", item);
          onChange?.(e, item);
          setSelectedItem(item);
          setInputValue(item);
        }}
        style={{ maxHeight: "150px", width: "100%" }}
      />
    </FlexLayout>
  );
};
Controlled.args = {
  source: usStateExampleData,
};

export const Disabled = Default.bind({});
Disabled.args = {
  disabled: true,
};

export const DisabledSelected = Default.bind({});
DisabledSelected.args = {
  defaultSelectedItem: "Alaska",
  source: usStateExampleData,
};

export const Empty: StoryFn<ListNextProps<string>> = (source, args) => {
  const [showList, setShowList] = useState(false);

  const itemDisabled = useCallback(
    (item: string) =>
      [usStateExampleData[1], usStateExampleData[5]].includes(item),
    []
  );

  return (
    <FlexLayout direction="column" style={{ height: "200px" }}>
      <Button onClick={() => setShowList(!showList)}>Toggle list</Button>
      <ListNext
        source={showList ? usStateExampleData : []}
        itemDisabled={itemDisabled}
        aria-label="Populated List example"
        emptyPlaceholder={<div>List is empty</div>}
        {...args}
      />
    </FlexLayout>
  );
};
