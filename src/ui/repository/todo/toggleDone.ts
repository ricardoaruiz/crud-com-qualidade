import { ServerErrorData } from "@server/infra/exceptions/ServerErrorData";
import { Todo, TodoSchema } from "@ui/schema/todo";

const TODOS_URL = "api/todos";

interface ToggleDoneRepositoryParams {
  id: string;
}

/**
 * Sends a PUT request to the server with the specified TODO id and returns a Promise that resolves to a Todo object.
 *
 * @param {string} id - The TODO id.
 * @return {Promise<Todo>} A Promise that resolves to a Todo object.
 */
export default async function ({
  id,
}: ToggleDoneRepositoryParams): Promise<Todo> {
  const response = await fetch(`${TODOS_URL}/${id}/toggle-done`, {
    method: "PUT",
  });

  if (!response.ok) {
    const errorObj: ServerErrorData = await response.json();
    throw new Error(errorObj.error.message);
  }

  const updatedTodo = await response.json();

  const parsedTodo = TodoSchema.safeParse(updatedTodo);

  if (!parsedTodo.success) {
    throw new Error("Returned updated todo is not valid");
  }

  return parsedTodo.data;
}
