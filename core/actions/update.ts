import fs from 'fs';

import { Todo, UUID } from "../types";
import { DB_FILE_PATH } from '../constants';
import { readTodos } from './read';

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
export function updateTodoContentById(id: UUID, content: string): Todo {
  return updateTodo(id, { content });
}

/**
 * Marks a todo as done.
 *
 * @param {UUID} id - The ID of the todo to mark as done.
 * @return {Todo} The updated todo.
 */
export function markTodoAsDone(id: UUID): Todo {
  return updateTodo(id, { done: true });
}