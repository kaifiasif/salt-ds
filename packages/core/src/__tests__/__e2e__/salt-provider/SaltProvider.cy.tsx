import {
  SaltProvider,
  useAriaAnnouncer,
  useDensity,
  useTheme,
  UNSTABLE_SaltProviderNext,
} from "@salt-ds/core";
import { mount } from "cypress/react";

const TestComponent = ({
  id = "test-1",
  className = "",
}: {
  id?: string;
  className?: string;
}) => {
  const density = useDensity();
  const { theme, mode, UNSTABLE_corner } = useTheme();
  const { announce } = useAriaAnnouncer();
  const announcerPresent = typeof announce === "function";

  return (
    <div
      id={id}
      className={className}
      data-density={density}
      data-theme={theme}
      data-mode={mode}
      data-announcer={announcerPresent}
      data-corner={UNSTABLE_corner}
    />
  );
};

describe("Given a SaltProvider", () => {
  describe("with no props set", () => {
    it("should apply the given theme and density class names to the html element", () => {
      mount(
        <SaltProvider>
          <TestComponent />
        </SaltProvider>
      );

      cy.get("div.salt-provider").should("have.length", 0);

      cy.get("html")
        .should("exist")
        .and("have.attr", "data-mode", "light")
        .and("have.class", "salt-density-medium");
    });
    it("should apply correct default values for Density and Theme and add an AriaAnnouncer", () => {
      mount(
        <SaltProvider>
          <TestComponent />
        </SaltProvider>
      );
      cy.get("#test-1")
        .should("exist")
        .and("have.attr", "data-density", "medium")
        .and("have.attr", "data-mode", "light")
        .and("have.attr", "data-announcer", "true");
      cy.get("[aria-live]").should("exist");
    });

    it("should not have theme next class and attributes applied", () => {
      mount(
        <SaltProvider>
          <TestComponent />
        </SaltProvider>
      );

      cy.get(".salt-theme-next").should("have.length", 0);
      cy.get("html").should("exist").and("not.have.attr", "data-corner");
    });
  });

  describe("with props set", () => {
    it("should apply correct default value for Density and add an AriaAnnouncer", () => {
      mount(
        <SaltProvider mode="dark">
          <TestComponent />
        </SaltProvider>
      );
      cy.get("#test-1")
        .should("exist")
        .and("have.attr", "data-density", "medium")
        .and("have.attr", "data-mode", "dark")
        .and("have.attr", "data-announcer", "true");
    });

    it("should apply correct default value for Theme and add an AriaAnnouncer", () => {
      mount(
        <SaltProvider density="high">
          <TestComponent />
        </SaltProvider>
      );
      cy.get("#test-1")
        .should("exist")
        .and("have.attr", "data-density", "high")
        .and("have.attr", "data-mode", "light")
        .and("have.attr", "data-announcer", "true");
    });

    it("should apply values specified in props", () => {
      mount(
        <SaltProvider density="high" mode="dark">
          <TestComponent />
        </SaltProvider>
      );
      cy.get("#test-1")
        .should("exist")
        .and("have.attr", "data-density", "high")
        .and("have.attr", "data-mode", "dark")
        .and("have.attr", "data-announcer", "true");
    });
  });

  describe("when nested", () => {
    it("should only create a single AriaAnnouncer", () => {
      mount(
        <SaltProvider>
          <SaltProvider>
            <TestComponent />
          </SaltProvider>
        </SaltProvider>
      );

      cy.get("[aria-live]").should("have.length", 1);
    });

    it("should inherit values not passed as props", () => {
      mount(
        <SaltProvider density="high" mode="dark">
          <TestComponent />
          <SaltProvider density="medium">
            <TestComponent id="test-2" />
          </SaltProvider>
        </SaltProvider>
      );

      cy.get("#test-1")
        .should("exist")
        .and("have.attr", "data-density", "high")
        .and("have.attr", "data-mode", "dark")
        .and("have.attr", "data-announcer", "true");

      cy.get("#test-2")
        .should("exist")
        .and("have.attr", "data-density", "medium")
        .and("have.attr", "data-mode", "dark")
        .and("have.attr", "data-announcer", "true");
    });
  });

  describe("when child is passed to applyClassesTo", () => {
    it("should not create a div element", () => {
      mount(
        <SaltProvider density="high" mode="dark" applyClassesTo={"child"}>
          <TestComponent />
        </SaltProvider>
      );

      cy.get("div.salt-provider").should("have.length", 0);

      cy.get("#test-1")
        .should("exist")
        .and("have.attr", "data-mode", "dark")
        .and("have.class", "salt-theme")
        .and("have.class", "salt-density-high");
    });
  });

  describe("when root is passed to applyClassesTo", () => {
    it("should apply the given theme and density class names to the html element", () => {
      mount(
        <SaltProvider density="high" mode="dark" applyClassesTo={"root"}>
          <TestComponent />
        </SaltProvider>
      );

      cy.get("div.salt-provider").should("have.length", 0);

      cy.get("html")
        .should("exist")
        .and("have.attr", "data-mode", "dark")
        .and("have.class", "salt-density-high");
    });
  });

  describe("when scope is passed to applyClassesTo", () => {
    it("should create div element with correct classes applied even if it is the root level provider", () => {
      mount(
        <SaltProvider density="high" mode="dark" applyClassesTo={"scope"}>
          <TestComponent />
        </SaltProvider>
      );

      cy.get("div.salt-provider")
        .should("have.length", 1)
        .and("have.attr", "data-mode", "dark")
        .and("have.class", "salt-density-high");
    });
  });
});

describe("Given a SaltProviderNext", () => {
  describe("with no props set", () => {
    it("should apply default theme attributes to the html element", () => {
      mount(
        <UNSTABLE_SaltProviderNext>
          <TestComponent />
        </UNSTABLE_SaltProviderNext>
      );

      cy.get("div.salt-provider").should("have.length", 0);

      cy.get("html")
        .should("exist")
        .and("have.attr", "data-mode", "light")
        .and("have.attr", "data-corner", "none")
        .and("have.class", "salt-density-medium");
    });
    it("should read correct default values from provider and add an AriaAnnouncer", () => {
      mount(
        <UNSTABLE_SaltProviderNext>
          <TestComponent />
        </UNSTABLE_SaltProviderNext>
      );
      cy.get("#test-1")
        .should("exist")
        .and("have.attr", "data-density", "medium")
        .and("have.attr", "data-mode", "light")
        .and("have.attr", "data-announcer", "true")
        .and("have.attr", "data-corner", "none");
      cy.get("[aria-live]").should("exist");
    });
  });

  describe("when nested", () => {
    it("should inherit values not passed as props", () => {
      mount(
        <UNSTABLE_SaltProviderNext
          density="high"
          mode="dark"
          cornerRadius="rounded"
        >
          <TestComponent />
          <UNSTABLE_SaltProviderNext density="medium">
            <TestComponent id="test-2" />
          </UNSTABLE_SaltProviderNext>
        </UNSTABLE_SaltProviderNext>
      );

      cy.get("#test-1")
        .should("exist")
        .and("have.attr", "data-density", "high")
        .and("have.attr", "data-mode", "dark")
        .and("have.attr", "data-corner", "rounded")
        .and("have.attr", "data-announcer", "true");

      cy.get("#test-2")
        .should("exist")
        .and("have.attr", "data-density", "medium")
        .and("have.attr", "data-mode", "dark")
        .and("have.attr", "data-corner", "rounded")
        .and("have.attr", "data-announcer", "true");
    });
    it("should take different values set as props", () => {
      mount(
        <UNSTABLE_SaltProviderNext
          density="high"
          mode="dark"
          cornerRadius="rounded"
        >
          <TestComponent />
          <UNSTABLE_SaltProviderNext density="medium" cornerRadius="none">
            <TestComponent id="test-2" />
          </UNSTABLE_SaltProviderNext>
        </UNSTABLE_SaltProviderNext>
      );

      cy.get("#test-1")
        .should("exist")
        .and("have.attr", "data-density", "high")
        .and("have.attr", "data-mode", "dark")
        .and("have.attr", "data-corner", "rounded")
        .and("have.attr", "data-announcer", "true");

      cy.get("#test-2")
        .should("exist")
        .and("have.attr", "data-density", "medium")
        .and("have.attr", "data-mode", "dark")
        .and("have.attr", "data-corner", "none")
        .and("have.attr", "data-announcer", "true");
    });
  });
});
