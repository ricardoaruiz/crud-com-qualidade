import fs from 'fs';

/**
 * The path to the database file.
 */
const DB_FILE_PATH = './core/db';

/**
 * An interface representing a todo.
 */
interface Todo {
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
function createTodo(content: string): void {
  
  const todo: Todo = {
    date: new Date().toISOString(),
    content: content,
    done: false
  }

  const todos: Todo[] = [
    ...readTodos(),
    todo
  ]

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

// [SIMULATUION]
clearDB();
createTodo('Primeira TODO');
createTodo('Segunda TODO');
createTodo('Terceira TODO');
console.log(readTodos());