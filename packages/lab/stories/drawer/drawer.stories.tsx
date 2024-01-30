import { ChangeEvent, SyntheticEvent, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  FlexItem,
  FlexLayout,
  FlowLayout,
  FormField,
  FormFieldHelperText,
  FormFieldLabel,
  Input,
  StackLayout,
} from "@salt-ds/core";
import { ComboBoxNext, Option, Drawer, DrawerCloseButton } from "@salt-ds/lab";
import { Meta, StoryFn } from "@storybook/react";
import { MultipleCards } from "@salt-ds/site/src/examples/card";

export default {
  title: "Lab/Drawer",
  component: Drawer,
} as Meta<typeof Drawer>;

const DrawerTemplate: StoryFn<typeof Drawer> = ({
  id,
  position = "left",
  ...args
}) => {
  const [open, setOpen] = useState(false);

  const handleRequestOpen = () => {
    setOpen(true);
  };

  const onOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleRequestOpen}>Open Drawer</Button>
      <Drawer
        {...args}
        open={open}
        onOpenChange={onOpenChange}
        id={id}
        position={position}
      >
        <DrawerCloseButton onClick={handleClose} />
      </Drawer>
    </>
  );
};

export const DefaultPrimary = DrawerTemplate.bind({});
DefaultPrimary.args = {
  id: "default-drawer",
};

export const DefaultSecondary = DrawerTemplate.bind({});
DefaultSecondary.args = {
  id: "default-drawer",
  variant: "secondary",
};

const FormFieldExample = () => (
  <FormField>
    <FormFieldLabel>Label</FormFieldLabel>
    <Input />
    <FormFieldHelperText>Help text appears here</FormFieldHelperText>
  </FormField>
);

export const TopFormField = () => {
  const [open, setOpen] = useState(false);
  const id = "top-drawer";

  const handleRequestOpen = () => {
    setOpen(true);
  };

  const onOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleRequestOpen}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={onOpenChange} id={id} position="top">
        <StackLayout>
          <h2 id={`${id}-header`}>Section title</h2>
          <DrawerCloseButton onClick={handleClose} />
          <p id={`${id}-content`}>
            Incididunt adipisicing deserunt nostrud ullamco consequat
            consectetur magna id do irure labore fugiat. Eiusmod pariatur
            officia elit ad. Ullamco adipisicing Lorem amet velit in do
            reprehenderit nostrud eu aute voluptate quis quis.
          </p>
          <FlexLayout>
            {Array.from({ length: 4 }, (_, index) => (
              <FormFieldExample key={index} />
            ))}
          </FlexLayout>
          <FlexItem align="end">
            <Button onClick={handleClose}>Close Drawer</Button>
          </FlexItem>
        </StackLayout>
      </Drawer>
    </>
  );
};

export const RightFormField = () => {
  const [open, setOpen] = useState(false);
  const id = "right-drawer";

  const handleRequestOpen = () => {
    setOpen(true);
  };

  const onOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleRequestOpen}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={onOpenChange} id={id} position="right">
        <StackLayout>
          <h2 id={`${id}-header`}>Section Title</h2>
          <DrawerCloseButton onClick={handleClose} />
          <p id={`${id}-content`}>
            Incididunt adipisicing deserunt nostrud ullamco consequat
            consectetur magna id do irure labore fugiat. Eiusmod pariatur
            officia elit ad. Ullamco adipisicing Lorem amet velit in do
            reprehenderit nostrud eu aute voluptate quis quis.
          </p>
          {Array.from({ length: 7 }, (_, index) => (
            <FormFieldExample key={index} />
          ))}
          <FlexItem align="end">
            <Button onClick={handleClose}>Close Drawer</Button>
          </FlexItem>
        </StackLayout>
      </Drawer>
    </>
  );
};

export const Bottom = () => {
  const [open, setOpen] = useState(false);
  const id = "bottom-drawer";

  const handleRequestOpen = () => {
    setOpen(true);
  };

  const onOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleRequestOpen}>Open Drawer</Button>
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        id={id}
        position="bottom"
        style={{ height: 350 }}
      >
        <DrawerCloseButton onClick={handleClose} />
        <StackLayout>
          <h2 id={`${id}-header`}>Bottom drawer with master detail layout</h2>
          <FlowLayout>
            <MultipleCards />
            <MultipleCards />
            <MultipleCards />
          </FlowLayout>
          <FlexItem align="end">
            <Button onClick={handleClose}>Close Drawer</Button>
          </FlexItem>
        </StackLayout>
      </Drawer>
    </>
  );
};

export const OptionalCloseButton = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const id = "right-drawer";
  const postcodes = ["05011", "01050", "03040", "11050"];

  const handleRequestOpen = () => {
    setOpen(true);
  };

  const onOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };

  const handleSelectionChange = (
    event: SyntheticEvent,
    newSelected: string[]
  ) => {
    return newSelected.length === 1 ? setValue(newSelected[0]) : setValue("");
  };

  return (
    <>
      <Button onClick={handleRequestOpen}>Open Drawer</Button>
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        id={id}
        position="right"
        style={{ width: 500 }}
      >
        <StackLayout>
          <h2>Add your delivery details</h2>
          <FormField>
            <FormFieldLabel>House no.</FormFieldLabel>
            <Input />
          </FormField>
          <FormField>
            <FormFieldLabel>Street name</FormFieldLabel>
            <Input />
          </FormField>
          <FormField>
            <FormFieldLabel>Postcode</FormFieldLabel>
            <ComboBoxNext
              onChange={handleChange}
              onSelectionChange={handleSelectionChange}
              value={value}
              placeholder="Search for your postcode"
            >
              {postcodes.map((postcode) => (
                <Option value={postcode} key={postcode}>
                  {postcode}
                </Option>
              ))}
            </ComboBoxNext>
            <FormFieldHelperText>Do not include space</FormFieldHelperText>
          </FormField>
          <FormField>
            <FormFieldLabel>City/Town</FormFieldLabel>
            <Input />
          </FormField>
          <FormField>
            <FormFieldLabel>Country</FormFieldLabel>
            <Input />
          </FormField>
          <FormField>
            <Checkbox label="Dog(s) present at my property" />
          </FormField>
          <FlexItem align="end">
            <Button onClick={handleClose}>Submit</Button>
          </FlexItem>
        </StackLayout>
      </Drawer>
    </>
  );
};
