import fs from 'fs';
import { v4 as uuid } from 'uuid'

/**
 * The path to the database file.
 */
const DB_FILE_PATH = './core/db';

/**
 * The UUID type.
 */
type UUID = string;

/**
 * An interface representing a todo.
 */
interface Todo {
  id: string;
  date: string;
  content: string;
  done: boolean;
}

/**
 * Creates a new todo with the given content and saves it to the database.
 *
 * @param {string} content - The content of the todo.
 * @return {void} 
 */
function createTodo(content: string): Todo {
  
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false
  }

  const todos: Todo[] = [
    ...readTodos(),
    todo
  ]

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({todos}, null, 2));
  return todo;
}

/**
 * Updates a todo item with the given id by merging it with the properties 
 * from the partialTodo object.
 *
 * @param {UUID} id - The id of the todo item to update.
 * @param {Partial<Todo>} partialTodo - The partial todo object containing 
 *     the properties to merge with the existing todo item.
 * @return {Todo} - The updated todo item.
 */
function updateTodo(id: UUID, partialTodo: Partial<Todo>): Todo {
  
  const todos = readTodos();

  if (!todos.length) {
    throw new Error('There are not todos to update');
  }

  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    throw new Error('Todo not found');
  }
  
  const todoToUpdate = { ...todos[todoIndex], ...partialTodo };
  todos.splice(todoIndex, 1, todoToUpdate);

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({todos}, null, 2));

  return todoToUpdate;
}

/**
 * Updates the content of a todo item based on its ID.
 *
 * @param {UUID} id - The ID of the todo item.
 * @param {string} content - The new content for the todo item.
 * @return {Todo} - The updated todo item.
 */
function updateTodoContentById(id: UUID, content: string): Todo {
  return updateTodo(id, { content });
}

/**
 * Marks a todo as done.
 *
 * @param {UUID} id - The ID of the todo to mark as done.
 * @return {Todo} The updated todo.
 */
function markTodoAsDone(id: UUID): Todo {
  return updateTodo(id, { done: true });
}

/**
 * Removes a todo item from the todos list based on the given id.
 *
 * @param {UUID} id - The id of the todo item to be deleted.
 * @return {void} This function does not return anything.
 */
function deleteTodo(id: UUID): void {
  const todos = readTodos();

  if (!todos.length) {
    return;
  }

  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    throw new Error('Todo not found');
  }

  todos.splice(todoIndex, 1);
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({todos}, null, 2));
}

/**
 * Reads the todo list from the database file.
 *
 * @return {Array<Todo>} The list of todos.
 */
function readTodos(): Array<Todo> {
  const content = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  const parsedContent = JSON.parse(content || '{}');
  return parsedContent.todos || [];
}

/**
 * Clears the content of the database file.
 *
 * @param {string} DB_FILE_PATH - The path to the database file.
 * @return {void} This function does not return anything.
 */
function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, '');
}

//==============================================================================================
// [SIMULATUION]
clearDB();

// Cria as todos
const todo1 = createTodo('Primeira TODO');
const todo2 = createTodo('Segunda TODO');
const todo3 = createTodo('Terceira TODO');

// Atualiza uma todo após um segundo da criação
setTimeout(() => {
  updateTodo(todo3.id, { content: 'Terceira TODO alterada', done: true });
}, 1000);

// Atualiza o conteúdo de uma todo após dois segundos da criação
setTimeout(() => {
  updateTodoContentById(todo2.id, 'Segunda TODO alterada');
}, 2000);

// Marca uma todo como concluída após um três segundos da criação
setTimeout(() => {
  markTodoAsDone(todo1.id);
  
}, 3000);

// Deleta uma todo após quatro segundos da criação
setTimeout(() => {
  deleteTodo(todo1.id);
}, 4000)
console.log(readTodos());