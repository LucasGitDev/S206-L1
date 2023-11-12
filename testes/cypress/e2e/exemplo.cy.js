// <reference types="cypress" />

describe("Criando cenário de teste para o site globalQA", () => {
  it("Caso de teste: Registrando um usuário no site com sucesso", () => {
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

  it("Caso de teste: Registrando um usuário com falha (faltando senha)", () => {
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

  it("Caso de teste: Realizando login com sucesso", () => {
    const { user, pass } = criarUsuario();
    cy.login(user, pass);
    cy.get("h1.ng-binding").should("contain.text", `Hi ${user}!`);
  });

  it("Caso de teste: Realizando login com falha (senha incorreta)", () => {
    const { user } = criarUsuario();
    cy.login(user, "senha incorreta");
    cy.get(".ng-binding").should(
      "contain.text",
      "Username or password is incorrect"
    );
  });

  it("Caso de teste: Realizando login com falha (usuário incorreto)", () => {
    const { pass } = criarUsuario();
    cy.login("usuario incorreto", pass);

    cy.get(".ng-binding").should(
      "contain.text",
      "Username or password is incorrect"
    );
  });

  it("Caso de teste: Realizando login com falha (usuário e senha incorretos)", () => {
    cy.login("usuario incorreto", "senha incorreta");
    cy.get(".ng-binding").should(
      "contain.text",
      "Username or password is incorrect"
    );
  });

  it("Caso de teste: Realizando login com falha (usuário e senha vazios)", () => {
    cy.login("", "");
    cy.get(".btn-primary").should("be.disabled");
  });

  it("Caso de teste: Realizando login com sucesso e logout", () => {
    const { user, pass } = criarUsuario();
    cy.login(user, pass);
    cy.get("h1.ng-binding").should("contain.text", `Hi ${user}!`);
    cy.get(".btn").click();
    cy.get("h2").should("contain.text", "Login");
  });

  it("Caso de teste: Deletando um usuário com sucesso", () => {
    const { user, pass } = criarUsuario();
    cy.login(user, pass);
    cy.get("h1.ng-binding").should("contain.text", `${user}!`);
    cy.get(".ng-binding > a").click();
    cy.get(".btn").click();
    cy.login(user, pass);
    cy.get(".ng-binding").should(
      "have.text",
      "Username or password is incorrect"
    );
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
