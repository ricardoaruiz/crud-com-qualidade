import fs from "fs";

import { Todo } from "../types";
import { DB_FILE_PATH } from "../constants";

/**
 * Reads the todo list from the database file.
 *
 * @return {Array<Todo>} The list of todos.
 */
export function readTodos(): Array<Todo> {
  try {
    const content = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const parsedContent = JSON.parse(content || "{}");
    return parsedContent.todos || [];
  } catch (error) {
    return [];
  }
}
