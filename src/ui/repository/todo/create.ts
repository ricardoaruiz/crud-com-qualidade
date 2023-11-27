import { ServerControllerException } from "@server/controller/exceptions/ServerControllerException";
import { TodoSchema } from "@ui/schema/todo";
import { Todo } from "core/types";

const TODOS_URL = "api/todos";

/**
 * Sends a POST request to the server with the specified content and returns a Promise that resolves to a Todo object.
 *
 * @param {string} content - The content of the todo.
 * @return {Promise<Todo>} A Promise that resolves to a Todo object.
 */
export default async function (content: string): Promise<Todo> {
  const response = await fetch(TODOS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  });

  if (!response.ok) {
    const errorObj: ServerControllerException = await response.json();
    throw new Error(errorObj.error.message);
  }

  const parsedTodo = TodoSchema.safeParse(await response.json());

  if (!parsedTodo.success) {
    throw new Error("Failed to create todo");
  }

  return parsedTodo.data;
}
