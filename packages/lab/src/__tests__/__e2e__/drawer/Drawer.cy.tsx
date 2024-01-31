import { composeStories } from "@storybook/react";
import * as drawerStories from "@stories/drawer/drawer.stories";

const composedStories = composeStories(drawerStories);

const { Default, TopUseCase, RightUseCase, BottomUseCase } = composedStories;

describe("GIVEN a Drawer", () => {
  describe("WHEN a position is provided", () => {
    it("THEN it should render on the left hand side", () => {
      cy.mount(<Default />);

      cy.findByRole("button", { name: /Primary Drawer/i }).click();

      cy.get(".saltDrawer").should("have.class", "saltDrawer-left");
    });

    it("THEN it should render at the top", () => {
      cy.mount(<TopUseCase />);

      cy.findByRole("button", { name: /Top Drawer/i }).click();

      cy.get(".saltDrawer").should("have.css", "top", "0px");
    });

    it("THEN it should render on the right hand side", () => {
      cy.mount(<RightUseCase />);

      cy.findByRole("button", { name: /Right Drawer/i }).click();

      cy.get(".saltDrawer").should("have.css", "right", "0px");
    });

    it("THEN it should render at the bottom", () => {
      cy.mount(<BottomUseCase />);

      cy.findByRole("button", { name: /Bottom Drawer/i }).click();

      cy.get(".saltDrawer").should("have.css", "bottom", "0px");
    });
  });

  describe("WHEN a drawer is open", () => {
    it("THEN it should be able to close", () => {
      cy.mount(<Default />);

      cy.findByRole("button", { name: /Primary Drawer/i }).click();

      cy.findByRole("dialog").should("be.visible");

      cy.findByLabelText("close").click();

      cy.findByRole("dialog").should("not.exist");
    });

    it("THEN it should be able to close by clicking outside", () => {
      cy.mount(<Default />);

      cy.findByRole("button", { name: /Primary Drawer/i }).click();

      cy.findByRole("dialog").should("be.visible");

      cy.get(".saltScrim").click();

      cy.findByRole("dialog").should("not.exist");
    });
  });

  describe("WHEN a variant is provided", () => {
    it("THEN it should display a primary variant", () => {
      cy.mount(<Default />);

      cy.findByRole("button", { name: /Primary Drawer/i }).click();

      cy.get(".saltDrawer").should("have.class", "saltDrawer-primary");
    });

    it("THEN it should display a secondary variant", () => {
      cy.mount(<Default />);

      cy.findByRole("button", { name: /Secondary Drawer/i }).click();

      cy.get(".saltDrawer").should("not.have.class", "saltDrawer-primary");
      cy.get(".saltDrawer").should("have.class", "saltDrawer-secondary");
    });
  });
});
