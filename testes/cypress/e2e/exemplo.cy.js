// <reference types="cypress" />

describe("Criando cenário de teste para o site globalQA", () => {
  it.skip("Caso de teste: Registrando um usuário no site com sucesso", () => {
    cy.visit(
      "https://globalsqa.com/angularJs-protractor/registration-login-example/#/login"
    );
    cy.get(".btn-link").click();
    cy.get("#firstName").type("Teste Nome");
    cy.get("#Text1").type("Teste Sobrenome");
    cy.get("#username").type("Teste Usuario");
    cy.get("#password").type("Teste Senha");
    cy.get(".btn-primary").click();
    cy.get(".ng-binding").should("contain.text", "Registration successful");
  });

  it.skip("Caso de teste: Registrando um usuário com falha (faltando senha)", () => {
    cy.visit(
      "https://globalsqa.com/angularJs-protractor/registration-login-example/#/register"
    );

    cy.get("#firstName").type("Teste Nome");
    cy.get("#Text1").type("Teste Sobrenome");
    cy.get("#username").type("Teste Usuario");
    cy.get("#password").type("Teste Senha");
    cy.get("#password").clear();

    cy.get(".has-error > .help-block").should(
      "have.text",
      "Password is required"
    );

    cy.get(".btn-primary").should("be.disabled");
  });

  it.skip("Caso de teste: Realizando login com sucesso", () => {
    const { user, pass } = criarUsuario();
    realizarLogin(user, pass);
    cy.get("h1.ng-binding").should("contain.text", `Hi ${user}!`);
  });

  it.skip("Caso de teste: Realizando login com falha (senha incorreta)", () => {
    const { user } = criarUsuario();
    realizarLogin(user, "senha incorreta");
    cy.get(".ng-binding").should(
      "contain.text",
      "Username or password is incorrect"
    );
  });

  it.skip("Caso de teste: Realizando login com falha (usuário incorreto)", () => {
    const { pass } = criarUsuario();
    realizarLogin("usuario incorreto", pass);

    cy.get(".ng-binding").should(
      "contain.text",
      "Username or password is incorrect"
    );
  });

  it.skip("Caso de teste: Realizando login com falha (usuário e senha incorretos)", () => {
    realizarLogin("usuario incorreto", "senha incorreta");
    cy.get(".ng-binding").should(
      "contain.text",
      "Username or password is incorrect"
    );
  });

  it.skip("Caso de teste: Realizando login com falha (usuário e senha vazios)", () => {
    realizarLogin("", "");
    cy.get(".btn-primary").should("be.disabled");
  });

  it.skip("Caso de teste: Realizando login com sucesso e logout", () => {
    const { user, pass } = criarUsuario();
    realizarLogin(user, pass);
    cy.get("h1.ng-binding").should("contain.text", `Hi ${user}!`);
    cy.get(".btn").click();
    cy.get("h2").should("contain.text", "Login");
  });
});

function criarUsuario() {
  const horas = new Date().getHours().toString();
  const minutos = new Date().getMinutes().toString();
  const segundos = new Date().getSeconds().toString();

  const user = `${horas} ${minutos} ${segundos} Id`;
  const pass = `${horas} ${minutos} ${segundos} Senha`;

  cy.visit(
    "https://globalsqa.com/angularJs-protractor/registration-login-example/#/login"
  );
  cy.get(".btn-link").click();
  cy.get("#firstName").type(user);
  cy.get("#Text1").type(user);
  cy.get("#username").type(user);
  cy.get("#password").type(pass);
  cy.get(".btn-primary").click();
  cy.get(".ng-binding").should("contain.text", "Registration successful");

  return { user, pass };
}

function realizarLogin(user, pass) {
  const currentPath = cy.url();
  if (
    currentPath !==
    "https://globalsqa.com/angularJs-protractor/registration-login-example/#/login"
  ) {
    cy.visit(
      "https://globalsqa.com/angularJs-protractor/registration-login-example/#/login"
    );
  }
  if (user !== "") cy.get("#username").type(user);
  if (pass !== "") cy.get("#password").type(pass);

  if (user !== "" && pass !== "") cy.get(".btn-primary").click();
}
