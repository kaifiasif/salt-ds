import { composeStories } from "@storybook/react";
import * as overlayStories from "@stories/menu/menu.stories";
import { checkAccessibility } from "../../../../../../cypress/tests/checkAccessibility";

const composedStories = composeStories(overlayStories);
const { Default, Controlled } = composedStories;

describe("GIVEN a Menu", () => {
  checkAccessibility(composedStories);

  describe("WHEN single level Menu", () => {
    it("shows Menu on trigger ckick", () => {
      cy.mount(<Default />);

      cy.findByRole("button").realClick();
      cy.findByRole("menu").should("exist");
    });
  });
});
