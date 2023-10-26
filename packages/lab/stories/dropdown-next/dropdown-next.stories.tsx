import { Button, FlexLayout, StackLayout } from "@salt-ds/core";
import { ArrowDownIcon, ArrowUpIcon } from "@salt-ds/icons";
import { DropdownNext, DropdownNextProps } from "@salt-ds/lab";
import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

export default {
  title: "Lab/Dropdown Next",
  component: DropdownNext,
} as Meta<typeof DropdownNext>;

const ListExample = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
];

const DropdownTemplate: StoryFn<DropdownNextProps<string>> = ({ ...args }) => {
  return (
    <DropdownNext
      onSelect={(_, data) => {
        console.log("selected item", data);
      }}
      {...args}
    />
  );
};

export const Default = DropdownTemplate.bind({});
Default.args = {
  source: ListExample,
};

export const WithDefaultSelected = DropdownTemplate.bind({});
WithDefaultSelected.args = {
  defaultSelectedItem: "California",
  source: ListExample,
};

export const Readonly = DropdownTemplate.bind({});
Readonly.args = {
  readOnly: true,
  defaultSelectedItem: "California",
  source: ListExample,
};

export const Disabled = DropdownTemplate.bind({});
Disabled.args = {
  disabled: true,
  defaultSelectedItem: "California",
  source: ListExample,
};

export const Variants: StoryFn<DropdownNextProps<string>> = ({
  source = ListExample,
}) => {
  return (
    <StackLayout>
      <DropdownNext source={source} />
      <DropdownNext source={source} variant="secondary" />
    </StackLayout>
  );
};

export const Controlled: StoryFn<DropdownNextProps<string>> = ({
  source = ListExample,
  ...props
}) => {
  const initialValue = "California";

  const [highlightedIndex, setHighlightedIndex] = useState(
    ListExample.indexOf(initialValue) ?? 0
  );
  const [selectedItem, setSelectedItem] = useState(initialValue);
  const [open, setOpen] = useState(false);

  const handleOpenClose = () => {
    setOpen(!open);
  };

  const handleArrowDown = () => {
    setOpen(true);
    const nextIndex = highlightedIndex === undefined ? 0 : highlightedIndex + 1;
    setHighlightedIndex(nextIndex);
  };

  const handleArrowUp = () => {
    setOpen(true);
    const prevIndex = highlightedIndex === undefined ? 0 : highlightedIndex - 1;
    setHighlightedIndex(prevIndex);
  };

  const handleSelect = () => {
    highlightedIndex && setSelectedItem(ListExample[highlightedIndex]);
    setOpen(false);
  };

  return (
    <FlexLayout>
      <FlexLayout gap={1}>
        <Button onClick={handleOpenClose}>{open ? "Close" : "Open"}</Button>
        <Button
          disabled={highlightedIndex === ListExample.length - 1}
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
      <DropdownNext
        {...props}
        source={source}
        open={open}
        selectedItem={selectedItem}
        highlightedIndex={highlightedIndex}
      />
    </FlexLayout>
  );
};
