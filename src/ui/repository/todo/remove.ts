import { ServerControllerException } from "@server/controller/exceptions/ServerControllerException";

const TODOS_URL = "api/todos";

interface RemoveTodoRepositoryParams {
  id: string;
}

/**
 * Removes a todo item from the repository.
 *
 * @param {RemoveTodoRepositoryParams} id - The ID of the todo item to remove.
 * @return {Promise<void>} A promise that resolves when the item is successfully removed.
 */
export default async function remove({
  id,
}: RemoveTodoRepositoryParams): Promise<void> {
  const response = await fetch(`${TODOS_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorObj: ServerControllerException = await response.json();
    throw new Error(errorObj.error.message);
  }

  return;
}
