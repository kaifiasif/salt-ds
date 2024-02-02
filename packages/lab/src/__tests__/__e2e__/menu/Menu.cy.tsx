import { composeStories } from "@storybook/react";
import * as overlayStories from "@stories/menu/menu.stories";
import { checkAccessibility } from "../../../../../../cypress/tests/checkAccessibility";

const composedStories = composeStories(overlayStories);
const { Default, Controlled } = composedStories;

describe("GIVEN a Menu", () => {
  checkAccessibility(composedStories);

  describe("WHEN single level Menu", () => {
    it("THEN shows Menu on trigger ckick", () => {
      cy.mount(<Default />);

      cy.findByRole("button").realClick();
      cy.findByRole("menu").should("exist");
    });
    it("THEN closes menu when selecting menu item", () => {
      cy.mount(<Default />);

      cy.findByRole("button").realClick();
      cy.findByRole("menu").should("exist");

      cy.findAllByRole("menuitem").first().realClick();
      cy.findByRole("menu").should("not.exist");
    });
    describe("AND controlled", () => {
      it("THEN it shows and hide menu on button click", () => {
        cy.mount(<Controlled />);

        cy.findByRole("button", { name: /Menu/i }).realClick();
        cy.findByRole("menu").should("exist");
        cy.findByRole("button", { name: /Menu/i }).realClick();
        cy.findByRole("menu").should("not.exist");
      });
    });
  });
});
