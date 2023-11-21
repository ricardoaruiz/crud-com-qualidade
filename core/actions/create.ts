import fs from "fs";
import { v4 as uuid } from "uuid";

import { Todo } from "../types";
import { readTodos } from "./read";
import { DB_FILE_PATH } from "../constants";

/**
 * Creates a new todo with the given content and saves it to the database.
 *
 * @param {string} content - The content of the todo.
 * @return {void}
 */
export function createTodo(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  const todos: Todo[] = [...readTodos(), todo];

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
  return todo;
}
