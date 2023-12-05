const BASE_URL = "http://localhost:3000/api";

const inputAddTodo = 'input[type="text"][placeholder="Correr, Estudar..."]';
const inputAddTodoErrorMessage = "p[role='alert']";
const buttonAddTodo = "[aria-label='Adicionar novo item']";
const inputFilterTodo =
  'input[type="text"][placeholder="Filtrar lista atual, ex: Dentista"]';
const loadingTodoMessage = 'td[aria-label="Carregando"]';
const notFoundTodoMessage = 'td[aria-label="Nenhum item encontrado"]';
const todoTableRows = "tbody > tr";

describe("/ - Todos Feed", () => {
  it("when load, renders the page with no todos", () => {
    cy.intercept(
      "GET",
      `${BASE_URL}/todos?page=1&limit=5&search=`,
      (request) => {
        request.reply({
          statusCode: 200,
          body: {
            todos: [],
            total: 0,
            pages: 0,
          },
        });
      },
    ).as("readTodos");

    cy.visit("http://localhost:3000");

    cy.get(inputAddTodo).should("be.visible");
    cy.get(buttonAddTodo).should("be.visible");
    cy.get(inputFilterTodo).should("be.visible");
    cy.get(loadingTodoMessage).should("be.visible");
    cy.get(notFoundTodoMessage).should("not.be.visible");
  });

  it("when load, renders the page with todos", () => {
    cy.intercept(
      "GET",
      `${BASE_URL}/todos?page=1&limit=5&search=`,
      (request) => {
        request.reply({
          statusCode: 200,
          body: {
            todos: [
              {
                id: "938e0105-2749-4766-9acb-e99a67875d01",
                date: "2023-11-30T02:04:08.898Z",
                content: "Todo 00001",
                done: false,
              },
              {
                id: "1f99061e-f97f-48e6-8df9-0b886e921d04",
                date: "2023-11-29T01:13:30.662Z",
                content: "Todo 00002",
                done: false,
              },
            ],
            total: 0,
            pages: 0,
          },
        });
      },
    ).as("readTodos");

    cy.visit("http://localhost:3000");

    cy.get(loadingTodoMessage).should("be.visible");
    cy.get(notFoundTodoMessage).should("not.exist");
    cy.get(todoTableRows).should("have.length", 2);

    cy.get("tbody > :nth-child(1) > :nth-child(2)").should("have.text", "938e");
    cy.get("tbody > :nth-child(1) > :nth-child(3)").should(
      "have.text",
      "Todo 00001",
    );

    cy.get("tbody > :nth-child(2) > :nth-child(2)").should("have.text", "1f99");
    cy.get("tbody > :nth-child(2) > :nth-child(3)").should(
      "have.text",
      "Todo 00002",
    );
  });

  it("show message error when not informed content on create todo", () => {
    cy.visit("http://localhost:3000");

    cy.get(buttonAddTodo).click();

    cy.get(inputAddTodoErrorMessage).should(
      "have.text",
      "O conteúdo deve ter pelo menos 10 caracteres",
    );
  });

  it("show message error when informed a content with less than 10 characters", () => {
    cy.visit("http://localhost:3000");

    cy.get(buttonAddTodo).click();
    cy.get(inputAddTodo).type("Teste");
    cy.get(inputAddTodoErrorMessage).should(
      "have.text",
      "O conteúdo deve ter pelo menos 10 caracteres",
    );
  });

  it("when create a new todo, it must appears in the screen", () => {
    // cy.intercept(
    //   "GET",
    //   `${BASE_URL}/todos?page=1&limit=5&search=`,
    //   (request) => {
    //     request.reply({
    //       statusCode: 200,
    //       body: {
    //         todos: [],
    //         total: 0,
    //         pages: 0,
    //       },
    //     });
    //   },
    // ).as("readTodos1");

    cy.intercept("POST", `${BASE_URL}/todos`, (request) => {
      request.reply({
        statusCode: 201,
        body: {
          id: "fcb97a1f-dd63-4a2e-8f29-947f1a2938b9",
          date: "2023-11-29T01:13:19.454Z",
          content: "Teste Todo",
          done: false,
        },
      });
    }).as("createTodo");

    cy.intercept(
      "GET",
      `${BASE_URL}/todos?page=1&limit=5&search=`,
      (request) => {
        request.reply({
          statusCode: 200,
          body: {
            todos: [
              {
                id: "938e0105-2749-4766-9acb-e99a67875d01",
                date: "2023-11-30T02:04:08.898Z",
                content: "Todo 000001",
                done: false,
              },
            ],
            total: 0,
            pages: 0,
          },
        });
      },
    ).as("readTodos2");

    cy.visit("http://localhost:3000");

    cy.get(inputAddTodo).type("Todo 000001");
    cy.get(buttonAddTodo).click();

    // cy.wait("@readTodos2");

    cy.get(notFoundTodoMessage).should("not.exist");
    cy.get(todoTableRows).should("have.length", 1);

    cy.get("tbody > tr > :nth-child(2)").should("have.text", "938e");
    cy.get("tbody > tr > :nth-child(3)").should("have.text", "Todo 000001");
  });
});
