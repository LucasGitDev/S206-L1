// <reference types="cypress" />

describe("Testing Swag Labs", () => {
  const validUsernames = [
    "standard_user",
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user",
  ];

  const locked_user = "locked_out_user";

  const getRandomUsername = () => {
    const randomIndex = Math.floor(Math.random() * validUsernames.length);
    return validUsernames[randomIndex];
  };

  const validPassword = "secret_sauce";

  it("should login with valid credentials by rolling a username", () => {
    const randomUsername = getRandomUsername();

    cy.login(randomUsername, validPassword);

    cy.get(".title").should("contain.text", "Products");
  });

  it("should not login with invalid credentials [username]", () => {
    const invalidUsername = "invalid_user";

    cy.login(invalidUsername, validPassword);

    cy.get('[data-test="error"]').should(
      "contain.text",
      "Username and password do not match any user in this service"
    );
  });

  it("should not login with invalid credentials [password]", () => {
    const randomUsername = getRandomUsername();
    const invalidPassword = "invalid_password";

    cy.login(randomUsername, invalidPassword);

    cy.get('[data-test="error"]').should(
      "contain.text",
      "Username and password do not match any user in this service"
    );
  });

  it("should not login with a locked user", () => {
    cy.login(locked_user, validPassword);

    cy.get('[data-test="error"]').should(
      "contain.text",
      "Sorry, this user has been locked out."
    );
  });

  it('should test the "Products" page', () => {
    const randomUsername = getRandomUsername();
    cy.login(randomUsername, validPassword);

    cy.get(".title").should("contain.text", "Products");

    cy.get(".inventory_item_name").should("have.length", 6);

    cy.get(".inventory_item_name").each((product) => {
      cy.log(product.text());
    });

    cy.get(".inventory_item_name").should("contain.text", "Sauce");
  });

  it("should test to buy a product", () => {
    cy.login(validUsernames[0], validPassword);

    cy.get(".title").should("contain.text", "Products");

    cy.get(`.inventory_item:contains("T-Shirt (Red)") .btn_inventory`).click();

    cy.get("#shopping_cart_container a").click();

    cy.get("#cart_contents_container .cart_item").should("have.length", 1);
    cy.get(".checkout_button").click();
    cy.get("#first-name").type("Lucas");
    cy.get("#last-name").type("e Natacha");
    cy.get("#postal-code").type("12345");
    cy.get(".checkout_buttons .btn_primary").click();

    cy.get(".cart_button").click();

    cy.get("#shopping_cart_container a").click();

    cy.get("#cart_contents_container .cart_item").should("have.length", 0);
  });

  it("should login and logout", () => {
    cy.login(validUsernames[0], validPassword);

    cy.get(".title").should("contain.text", "Products");

    cy.get(".bm-burger-button").click();
    cy.get("#logout_sidebar_link").click();

    cy.get(".login_logo").should("be.visible");
  });
});
