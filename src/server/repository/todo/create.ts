import { createTodo } from "@db-crud-todo";
import { Todo } from "core/types";

/**
 * Creates a new post with the given content.
 *
 * @param {string} content - The content of the post.
 * @return {Promise<Todo>} - A Promise that resolves to the created post.
 */
export default async function (content: string): Promise<Todo> {
  return createTodo(content);
}
