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
  H2,
  H4,
  Input,
  StackLayout,
} from "@salt-ds/core";
import { ComboBoxNext, Option, Drawer, DrawerCloseButton } from "@salt-ds/lab";
import { Meta } from "@storybook/react";
import { MultipleCards } from "@salt-ds/site/src/examples/card";

export default {
  title: "Lab/Drawer",
  component: Drawer,
} as Meta<typeof Drawer>;

export const Default = ({ position = "left", ...args }) => {
  const [openPrimary, setOpenPrimary] = useState(false);
  const [openSecondary, setOpenSecondary] = useState(false);

  return (
    <StackLayout>
      <Button onClick={() => setOpenPrimary(true)}>Primary Drawer</Button>
      <Drawer
        open={openPrimary}
        onOpenChange={(newOpen) => setOpenPrimary(newOpen)}
        id="primary"
      >
        <DrawerCloseButton onClick={() => setOpenPrimary(false)} />
      </Drawer>
      <Button onClick={() => setOpenSecondary(true)}>Secondary Drawer</Button>
      <Drawer
        open={openSecondary}
        onOpenChange={(newOpen) => setOpenSecondary(newOpen)}
        variant="secondary"
        id="secondary"
      >
        <DrawerCloseButton onClick={() => setOpenSecondary(false)} />
      </Drawer>
    </StackLayout>
  );
};

export const Position = ({ position = "left", ...args }) => {
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [openTop, setOpenTop] = useState(false);
  const [openBottom, setOpenBottom] = useState(false);

  return (
    <StackLayout>
      <Button onClick={() => setOpenLeft(true)}>Left Drawer</Button>
      <Drawer
        open={openLeft}
        onOpenChange={(newOpen) => setOpenLeft(newOpen)}
        id="left"
      >
        <DrawerCloseButton onClick={() => setOpenLeft(false)} />
      </Drawer>
      <Button onClick={() => setOpenRight(true)}>Right Drawer</Button>
      <Drawer
        open={openRight}
        onOpenChange={(newOpen) => setOpenRight(newOpen)}
        position="right"
        id="right"
      >
        <DrawerCloseButton onClick={() => setOpenRight(false)} />
      </Drawer>
      <Button onClick={() => setOpenTop(true)}>Top Drawer</Button>
      <Drawer
        open={openTop}
        onOpenChange={(newOpen) => setOpenTop(newOpen)}
        position="top"
        id="top"
      >
        <DrawerCloseButton onClick={() => setOpenTop(false)} />
      </Drawer>
      <Button onClick={() => setOpenBottom(true)}>Bottom Drawer</Button>
      <Drawer
        open={openBottom}
        onOpenChange={(newOpen) => setOpenBottom(newOpen)}
        position="bottom"
        id="bottom"
      >
        <DrawerCloseButton onClick={() => setOpenBottom(false)} />
      </Drawer>
    </StackLayout>
  );
};

const FormFieldExample = () => (
  <FormField>
    <FormFieldLabel>Label</FormFieldLabel>
    <Input />
    <FormFieldHelperText>Help text appears here</FormFieldHelperText>
  </FormField>
);

export const TopUseCase = () => {
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
      <Button onClick={handleRequestOpen}>Top Drawer</Button>
      <Drawer open={open} onOpenChange={onOpenChange} position="top" id="top">
        <StackLayout>
          <DrawerCloseButton onClick={handleClose} />
          <H2>Section title</H2>
          <H4>
            Incididunt adipisicing deserunt nostrud ullamco consequat
            consectetur magna id do irure labore fugiat. Eiusmod pariatur
            officia elit ad. Ullamco adipisicing Lorem amet velit in do
            reprehenderit nostrud eu aute voluptate quis quis.
          </H4>
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

export const RightUseCase = () => {
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
      <Button onClick={handleRequestOpen}>Right Drawer</Button>
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        position="right"
        style={{ width: 500 }}
        id="right"
      >
        <StackLayout>
          <DrawerCloseButton onClick={handleClose} />
          <H2>Section Title</H2>
          <H4>
            Incididunt adipisicing deserunt nostrud ullamco consequat
            consectetur magna id do irure labore fugiat. Eiusmod pariatur
            officia elit ad. Ullamco adipisicing Lorem amet velit in do
            reprehenderit nostrud eu aute voluptate quis quis.
          </H4>
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

export const BottomUseCase = () => {
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
      <Button onClick={handleRequestOpen}>Bottom Drawer</Button>
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        position="bottom"
        style={{ height: 350 }}
        id="bottom"
      >
        <DrawerCloseButton onClick={handleClose} />
        <StackLayout>
          <H2>Bottom drawer with master detail layout</H2>
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
        position="right"
        style={{ width: 500 }}
        id="right"
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
