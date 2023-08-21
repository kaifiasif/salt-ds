import { forwardRef, ComponentPropsWithoutRef, Ref } from "react";

import {
  FloatingComponentProvider,
  Tooltip,
  SaltProvider,
  FloatingComponentProps,
  Button,
} from "@salt-ds/core";
import { FloatingPortal } from "@floating-ui/react";

type RootComponentProps = FloatingComponentProps &
  ComponentPropsWithoutRef<"div">;

const TEST_ID = "test-floating-root";
const DEFAULT_TEST_ID = "default-floating-root";

const TO0LTIP_TEXT = "I am a tooltip";

const TestCustomFloatingComponent = forwardRef<HTMLElement, RootComponentProps>(
  (props, ref) => {
    const {
      open,
      disabled = false,
      top,
      left,
      width,
      height,
      position,
      ...rest
    } = props;
    const testId = "data-testid" in props ? props["data-testid"] : TEST_ID;
    const style = {
      top,
      left,
      position,
    };

    console.log({ width, height });
    return open && !disabled ? (
      <FloatingPortal>
        <SaltProvider>
          <div
            data-testid={testId}
            data-top={top}
            data-left={left}
            data-width={width}
            data-height={height}
            {...rest}
            style={style}
            ref={ref as Ref<HTMLDivElement>}
          />
        </SaltProvider>
      </FloatingPortal>
    ) : null;
  }
);

const DefaultCustomComponent = forwardRef<HTMLElement, RootComponentProps>(
  (props, ref) => {
    return (
      <TestCustomFloatingComponent
        {...props}
        ref={ref}
        data-testid={DEFAULT_TEST_ID}
      />
    );
  }
);

describe("Given a floating component in a FloatingComponentProvider", () => {
  const TestComponent = () => {
    return (
      <FloatingComponentProvider Component={TestCustomFloatingComponent}>
        <Tooltip content={TO0LTIP_TEXT} open>
          <Button>I am a button</Button>
        </Tooltip>
      </FloatingComponentProvider>
    );
  };

  it("should render the Floating Component as the root", () => {
    cy.mount(<TestComponent />);
    cy.findByTestId(TEST_ID).should("exist");
  });

  it("should be passed the top and left props", () => {
    cy.mount(<TestComponent />);

    cy.findByTestId(TEST_ID).should("have.attr", "data-top");
    cy.findByTestId(TEST_ID).should("have.attr", "data-left");
  });

  it("should be passed the width and height props", () => {
    const TEST_SIZE = 200;

    const TestSizeComponent = () => {
      return (
        <FloatingComponentProvider Component={TestCustomFloatingComponent}>
          <Tooltip
            content={
              <div style={{ minWidth: TEST_SIZE, minHeight: TEST_SIZE }}>
                {TO0LTIP_TEXT}
              </div>
            }
            open
          >
            <Button>I am a button</Button>
          </Tooltip>
        </FloatingComponentProvider>
      );
    };

    cy.mount(<TestSizeComponent />);

    cy.findByTestId(TEST_ID)
      .should("have.attr", "data-width")
      .should((widthAttr) => {
        expect(Number(widthAttr)).gte(TEST_SIZE);
      });
    cy.findByTestId(TEST_ID)
      .should("have.attr", "data-height")
      .should((widthAttr) => {
        expect(Number(widthAttr)).gte(TEST_SIZE);
      });
  });
});
