import { TodoSchema } from "@ui/schema/todo";
import { Todo } from "core/types";

const TODOS_URL = "api/todos";

interface UpdateTodoRepositoryParams {
  id: string;
}

/**
 * Sends a PUT request to the server with the specified done and returns a Promise that resolves to a Todo object.
 *
 * @param {string} content - The content of the todo.
 * @return {Promise<Todo>} A Promise that resolves to a Todo object.
 */
export default async function ({
  id,
}: UpdateTodoRepositoryParams): Promise<Todo> {
  const response = await fetch(`${TODOS_URL}/${id}/toggle-done`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  const updatedTodo = await response.json();

  const parsedTodo = TodoSchema.safeParse(updatedTodo);

  if (!parsedTodo.success) {
    throw new Error("Failed to update todo");
  }

  return parsedTodo.data;
}
