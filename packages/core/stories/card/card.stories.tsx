import { ReactNode } from "react";
import { Meta, StoryFn } from "@storybook/react";
import {
  Button,
  Card,
  InteractableCard,
  SaltProvider,
  Panel,
  H3,
  Text,
  FlexLayout,
  GridLayout,
  Link,
  StackLayout,
} from "@salt-ds/core";
import { ColumnLayoutContainer, ColumnLayoutItem } from "docs/story-layout";
import exampleImage from "./../assets/exampleImage1x.png";

import "./card.stories.css";

export default {
  title: "Core/Card",
  component: Card,
  argTypes: { onClick: { action: "clicked" } },
} as Meta<typeof Card>;

interface ExampleRowProps {
  children: ReactNode;
  name: string;
}

const ExampleRow = ({ name, children }: ExampleRowProps) => (
  <Panel style={{ height: "unset", width: 800 }}>
    <ColumnLayoutContainer>
      <ColumnLayoutItem>
        <SaltProvider density="high">{children}</SaltProvider>
      </ColumnLayoutItem>
      <ColumnLayoutItem>
        <SaltProvider density="medium">{children}</SaltProvider>
      </ColumnLayoutItem>
      <ColumnLayoutItem>
        <SaltProvider density="low">{children}</SaltProvider>
      </ColumnLayoutItem>
      <ColumnLayoutItem>
        <SaltProvider density="touch">{children}</SaltProvider>
      </ColumnLayoutItem>
    </ColumnLayoutContainer>
  </Panel>
);

const Examples = () => (
  <ExampleRow name="Sustainable investing products">
    <Card>
      <Text>
        We have a commitment to provide a wide range of investment solutions to
        enable you to align your financial goals to your values.
      </Text>
    </Card>
  </ExampleRow>
);

const InteractableExamples = () => (
  <ExampleRow name="Default">
    <InteractableCard>
      <Text>{exampleData[0].title}</Text>
    </InteractableCard>
  </ExampleRow>
);

export const AllDefault: StoryFn<typeof Card> = () => (
  <div>
    <SaltProvider mode="light">
      <Examples />
    </SaltProvider>
    <SaltProvider mode="dark">
      <Examples />
    </SaltProvider>
  </div>
);

const exampleData = [
  {
    title: "Sustainable investing products",
    content:
      "We have a commitment to provide a wide range of investment solutions to enable you to align your financial goals to your values.",
  },
  {
    title: "Our expertise",
    content:
      "Our team of more than 200 experts in 28 offices worldwide is on hand to help you with your investment decisions.",
  },
  {
    title: "Market-leading insights",
    content:
      "Our award-winning strategists provide unique and regular insights about market events and current trends.",
  },
  {
    title: "Events",
    content:
      "We have a full calendar of online and in-person events with expert guest speakers for you to attend.",
  },
];

export const Default: StoryFn<typeof Card> = () => (
  <Card style={{ width: "256px" }}>
    <StackLayout gap={1}>
      <H3>{exampleData[0].title}</H3>
      <Text>{exampleData[0].content}</Text>
    </StackLayout>
  </Card>
);

export const CardsInFlexLayout: StoryFn<typeof Card> = () => (
  <FlexLayout>
    {exampleData.map((example) => {
      return (
        <Card key={example.title}>
          <StackLayout gap={1}>
            <H3>{example.title}</H3>
            <Text>{example.content}</Text>
          </StackLayout>
        </Card>
      );
    })}
  </FlexLayout>
);

export const CardsInGridLayout: StoryFn<typeof Card> = () => (
  <GridLayout style={{ maxWidth: "700px" }} rows={2} columns={2}>
    {exampleData.map((example, index) => {
      return (
        <Card key={index}>
          <StackLayout gap={1}>
            <H3>{example.title}</H3>
            <Text>{example.content}</Text>
          </StackLayout>
        </Card>
      );
    })}
  </GridLayout>
);

export const DefaultWithImage: StoryFn<typeof Card> = () => (
  <Card style={{ width: "256px" }}>
    <img
      alt=""
      src={exampleImage}
      className="card-demo-image"
      style={{ width: "-webkit-fill-available" }}
    />
    <StackLayout gap={1}>
      <H3>{exampleData[0].title}</H3>
      <Text>{exampleData[0].content}</Text>
    </StackLayout>
  </Card>
);

export const DefaultWithLink: StoryFn<typeof Card> = () => (
  <Card style={{ width: "256px" }}>
    <StackLayout gap={1}>
      <H3>{exampleData[0].title}</H3>
      <StackLayout gap={1}>
        <Text>{exampleData[0].content}</Text>
        <Link href="#" IconComponent={null} target="_blank">
          View our range of funds
        </Link>
      </StackLayout>
    </StackLayout>
  </Card>
);

export const DefaultWithLinkAndImage: StoryFn<typeof Card> = () => (
  <Card className="withImage">
    <img
      aria-label="The Skies by Dominik Schröder"
      src={exampleImage}
      className="card-demo-image"
      style={{ width: "-webkit-fill-available" }}
    />
    <StackLayout
      style={{
        padding: "var(--salt-spacing-300)",
      }}
      gap={1}
    >
      <H3>{exampleData[0].title}</H3>
      <StackLayout gap={1}>
        <Text>{exampleData[0].content}</Text>
        <Link href="#" IconComponent={null} target="_blank">
          View our range of funds
        </Link>
      </StackLayout>
    </StackLayout>
  </Card>
);

export const DefaultWithButton: StoryFn<typeof Card> = () => (
  <Card style={{ width: "256px" }}>
    <StackLayout gap={1}>
      <H3>{exampleData[0].title}</H3>
      <StackLayout gap={2}>
        <Text>{exampleData[0].content}</Text>
        <Button onClick={() => window.open("#")}>View funds</Button>
      </StackLayout>
    </StackLayout>
  </Card>
);

export const DefaultWithButtonAndImage: StoryFn<typeof Card> = () => (
  <Card className="withImage">
    <img
      aria-label="The Skies by Dominik Schröder"
      src={exampleImage}
      className="card-demo-image"
      style={{ width: "-webkit-fill-available" }}
    />
    <StackLayout
      style={{
        padding: "var(--salt-spacing-300)",
      }}
      gap={1}
    >
      <H3>{exampleData[0].title}</H3>
      <StackLayout gap={2}>
        <Text>{exampleData[0].content}</Text>
        <Button onClick={() => window.open("#")}>View funds</Button>
      </StackLayout>
    </StackLayout>
  </Card>
);

export const InteractableAll: StoryFn<typeof Card> = () => (
  <div>
    <SaltProvider mode="light">
      <InteractableExamples />
    </SaltProvider>
    <SaltProvider mode="dark">
      <InteractableExamples />
    </SaltProvider>
  </div>
);

export const Interactable: StoryFn<typeof Card> = () => (
  <InteractableCard style={{ width: "256px" }}>
    <H3>{exampleData[0].title}</H3>
    <Text>{exampleData[0].content}</Text>
  </InteractableCard>
);

export const InteractableDisabled: StoryFn<typeof Card> = () => (
  <InteractableCard
    style={{ width: "256px" }}
    onClick={() => console.log("Clicked")}
    data-testid="card-disabled-example"
    disabled
  >
    <StackLayout gap={1}>
      <H3 disabled>{exampleData[0].title}</H3>
      <Text disabled>{exampleData[0].content}</Text>
    </StackLayout>
  </InteractableCard>
);

export const InteractableAccentVariations: StoryFn<typeof Card> = () => {
  const placements = ["left", "right", "top", "bottom"] as const;
  return (
    <StackLayout style={{ width: "266px" }}>
      {exampleData.map((example, index) => {
        return (
          <InteractableCard
            accentPlacement={placements[index]}
            key={example.title}
          >
            <StackLayout gap={1}>
              <H3>{example.title}</H3>
              <Text>{example.content}</Text>
            </StackLayout>
          </InteractableCard>
        );
      })}
    </StackLayout>
  );
};

export const InteractableAsBlockLink: StoryFn<typeof Card> = () => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      href="https://saltdesignsystem.com/"
      IconComponent={null}
      target="_blank"
    >
      <InteractableCard style={{ width: "266px" }}>
        <StackLayout gap={1}>
          <H3>{exampleData[0].title}</H3>
          <Text>{exampleData[0].content}</Text>
        </StackLayout>
      </InteractableCard>
    </Link>
  );
};

export const InteractableAsBlockLinkWithImage: StoryFn<typeof Card> = () => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      href="https://saltdesignsystem.com/"
      IconComponent={null}
      target="_blank"
    >
      <InteractableCard className="withImage">
        <img
          aria-label="The Skies by Dominik Schröder"
          src={exampleImage}
          className="card-demo-image"
          style={{ width: "-webkit-fill-available" }}
        />

        <StackLayout
          gap={1}
          style={{
            padding: "var(--salt-spacing-300)",
          }}
        >
          <H3>{exampleData[0].title}</H3>
          <Text>{exampleData[0].content}</Text>
        </StackLayout>
      </InteractableCard>
    </Link>
  );
};

export const InteractableAsBlockLinkWithImageBackground: StoryFn<
  typeof Card
> = () => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      href="https://saltdesignsystem.com/"
      IconComponent={null}
      target="_blank"
    >
      <InteractableCard className="imageBackground">
        <StackLayout
          style={{ paddingTop: "calc(3 * var(--salt-spacing-300))" }}
          gap={1}
        >
          <H3>{exampleData[0].title}</H3>
          <Text>{exampleData[0].content}</Text>
        </StackLayout>
      </InteractableCard>
    </Link>
  );
};

export const CardAndInteractableCardSizes: StoryFn<typeof Card> = () => {
  const sizes = ["small", "medium", "large"] as const;
  return (
    <StackLayout style={{ width: 600 }}>
      {sizes.map((size) => {
        return (
          <StackLayout direction="row" key={size}>
            <Card size={size}>
              <StackLayout gap={1}>
                <H3>{exampleData[0].title}</H3>
                <Text>{exampleData[0].content}</Text>
              </StackLayout>
            </Card>
            <InteractableCard size={size}>
              <StackLayout gap={1}>
                <H3>{exampleData[0].title}</H3>
                <Text>{exampleData[0].content}</Text>
              </StackLayout>
            </InteractableCard>
          </StackLayout>
        );
      })}
    </StackLayout>
  );
};

export const CardAndInteractableCardVariants: StoryFn<typeof Card> = () => {
  const variants = ["primary", "secondary"] as const;
  return (
    <StackLayout style={{ width: 600 }}>
      {variants.map((variant) => {
        return (
          <StackLayout direction="row" key={variant}>
            <Card variant={variant}>
              <StackLayout gap={1}>
                <H3>{exampleData[0].title}</H3>
                <Text>{exampleData[0].content}</Text>
              </StackLayout>
            </Card>
            <InteractableCard variant={variant}>
              <StackLayout gap={1}>
                <H3>{exampleData[0].title}</H3>
                <Text>{exampleData[0].content}</Text>
              </StackLayout>
            </InteractableCard>
          </StackLayout>
        );
      })}
    </StackLayout>
  );
};
