import fs from "fs";

import { UUID } from "../types";
import { DB_FILE_PATH } from "../constants";
import { readTodos } from "./read";

/**
 * Removes a todo item from the todos list based on the given id.
 *
 * @param {UUID} id - The id of the todo item to be deleted.
 * @return {void} This function does not return anything.
 */
export function deleteTodo(id: UUID): void {
  const todos = readTodos();

  if (!todos.length) {
    return;
  }

  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    throw new Error("Todo not found");
  }

  todos.splice(todoIndex, 1);
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
}
