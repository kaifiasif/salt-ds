import { composeStories } from "@storybook/react";
import * as drawerStories from "@stories/drawer/drawer.stories";

const composedStories = composeStories(drawerStories);

const { DefaultPrimary, TopFormField, RightFormField, BottomNoCloseButton } =
  composedStories;

describe("GIVEN a Drawer", () => {
  describe("WHEN no props are provided", () => {
    it("THEN it should display a scrim by default", () => {
      cy.mount(<DefaultPrimary />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();

      cy.get(".saltScrim").should("be.visible");
    });

    it("THEN it should default to a left position", () => {
      cy.mount(<DefaultPrimary />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();

      cy.get(".saltDrawer").should("have.class", "saltDrawer-left");
    });

    it("THEN it should display animations by default", () => {
      cy.mount(<DefaultPrimary />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();

      cy.get(".saltDrawer").should("have.class", "saltDrawer-enterAnimation");
    });

    it("THEN it should display a primary variant by default", () => {
      cy.mount(<DefaultPrimary />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();

      cy.get(".saltDrawer").should("have.class", "saltDrawer-primary");
    });
  });

  describe("WHEN a position is provided", () => {
    it("THEN it should render on the left hand side", () => {
      cy.mount(<DefaultPrimary position="left" />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();

      cy.get(".saltDrawer").should("have.class", "saltDrawer-left");
    });

    it("THEN it should render at the top", () => {
      cy.mount(<TopFormField />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();

      cy.get(".saltDrawer").should("have.css", "top", "0px");
    });

    it("THEN it should render on the right hand side", () => {
      cy.mount(<RightFormField />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();

      cy.get(".saltDrawer").should("have.css", "right", "0px");
    });

    it("THEN it should render at the bottom", () => {
      cy.mount(<BottomNoCloseButton />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();

      cy.get(".saltDrawer").should("have.css", "bottom", "0px");
    });
  });

  describe("WHEN a drawer is open", () => {
    it("THEN it should be able to close", () => {
      cy.mount(<DefaultPrimary />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();

      cy.findByRole("dialog").should("be.visible");

      cy.findByLabelText("close").click();

      cy.findByRole("dialog").should("not.exist");
    });

    it("THEN it should be able to close by clicking outside", () => {
      cy.mount(<DefaultPrimary />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();

      cy.findByRole("dialog").should("be.visible");

      cy.get(".saltScrim").click();

      cy.findByRole("dialog").should("not.exist");
    });
  });

  describe("WHEN a variant is provided", () => {
    it("THEN it should display a primary variant", () => {
      cy.mount(<DefaultPrimary variant="primary" />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();

      cy.get(".saltDrawer").should("have.class", "saltDrawer-primary");
    });

    it("THEN it should display a secondary variant", () => {
      cy.mount(<DefaultPrimary variant="secondary" />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();

      cy.get(".saltDrawer").should("not.have.class", "saltDrawer-primary");
      cy.get(".saltDrawer").should("have.class", "saltDrawer-secondary");
    });
  });
});
