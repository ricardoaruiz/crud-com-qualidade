/* eslint-disable no-console */
import { clearDB } from "./utils";
import { createTodo } from "./actions/create";
import { markTodoAsDone, updateTodoContentById } from "./actions/update";
import { readTodos } from "./actions/read";
import { deleteTodo } from "./actions/delete";

// Limpa o arquivo
clearDB();

// Cria as todos
const todo1 = createTodo("Primeira TODO");
const todo2 = createTodo("Segunda TODO");
const todo3 = createTodo("Terceira TODO");

// Atualiza uma todo após um segundo da criação
setTimeout(() => {
  updateTodoContentById(todo3.id, "Terceira TODO alterada");
}, 1000);

// Atualiza o conteúdo de uma todo após dois segundos da criação
setTimeout(() => {
  updateTodoContentById(todo2.id, "Segunda TODO alterada");
}, 2000);

// Marca uma todo como concluída após um três segundos da criação
setTimeout(() => {
  markTodoAsDone(todo1.id, true);
}, 3000);

// Deleta uma todo após quatro segundos da criação
setTimeout(() => {
  deleteTodo(todo1.id);
}, 4000);

//
const todos = readTodos();
console.log("[TODOS] =>", todos);
