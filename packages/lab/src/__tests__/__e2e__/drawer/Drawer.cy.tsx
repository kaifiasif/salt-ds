import { composeStories } from "@storybook/react";
import * as drawerStories from "@stories/drawer/drawer.stories";

const composedStories = composeStories(drawerStories);

const { Default, OptionalCloseButton } = composedStories;

describe("GIVEN a Drawer", () => {
  describe("WHEN a drawer with close button is open", () => {
    it("THEN it should close on close button click or outside Drawer click", () => {
      cy.mount(<Default />);

      cy.findByRole("button", { name: /Primary Drawer/i }).click();
      cy.findByRole("dialog").should("be.visible");
      cy.findByRole("button", { name: /Close Drawer/i }).click();
      cy.findByRole("dialog").should("not.exist");

      cy.findByRole("button", { name: /Secondary Drawer/i }).click();
      cy.findByRole("dialog").should("be.visible");
      cy.get(".saltScrim").click();
      cy.findByRole("dialog").should("not.exist");
    });

    it("THEN it should dismiss on Esc key press", () => {
      cy.mount(<Default />);

      cy.findByRole("button", { name: /Primary Drawer/i }).click();
      cy.findByRole("dialog").should("be.visible");
      cy.realPress("Escape");
      cy.findByRole("dialog").should("not.exist");
    });

    it("THEN it should trap focus within Drawer once opened", () => {
      cy.mount(<Default />);

      cy.findByRole("button", { name: /Primary Drawer/i }).click();
      cy.findByRole("dialog").should("be.visible");
      cy.findByRole("button", { name: /Close Drawer/i }).should("be.focused");
      cy.realPress("Tab");
      cy.realPress("Tab");
      cy.realPress("Tab");
      cy.findByRole("button", { name: /Close Drawer/i }).should("be.focused");
    });
  });

  describe("WHEN a drawer without close button is open", () => {
    it("THEN it should close on outside Drawer click or Esc key press", () => {
      cy.mount(<OptionalCloseButton />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();
      cy.findByRole("dialog").should("be.visible");
      cy.get(".saltScrim").click();
      cy.findByRole("dialog").should("not.exist");

      cy.findByRole("button", { name: /Open Drawer/i }).click();
      cy.findByRole("dialog").should("be.visible");
      cy.realPress("Escape");
      cy.findByRole("dialog").should("not.exist");
    });

    it("THEN it should trap focus within Drawer once opened", () => {
      cy.mount(<OptionalCloseButton />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();
      cy.findByRole("dialog").should("be.visible");
      cy.realPress("Tab");
      cy.realPress("Tab");
      cy.realPress("Tab");
      cy.realPress("Tab");
      cy.realPress("Tab");
      cy.realPress("Tab");
      cy.realPress("Tab");
      cy.findByRole("textbox", { name: /House no./i }).should("be.focused");
    });

    it("THEN focus goes into the first focusable element within Drawer", () => {
      cy.mount(<OptionalCloseButton />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();
      cy.findByRole("dialog").should("be.visible");
      cy.findByRole("textbox", { name: /House no./i }).should("be.focused");
    });

    it("THEN closes Drawer when an element is configured to close it", () => {
      cy.mount(<OptionalCloseButton />);

      cy.findByRole("button", { name: /Open Drawer/i }).click();
      cy.findByRole("dialog").should("be.visible");
      cy.findByRole("button", { name: /Submit/i }).click();
      cy.findByRole("dialog").should("not.be.visible");
    });
  });
});
