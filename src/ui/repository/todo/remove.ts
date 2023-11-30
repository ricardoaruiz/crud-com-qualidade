import { ServerErrorData } from "@server/infra/exceptions/ServerErrorData";

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
    const errorObj: ServerErrorData = await response.json();
    throw new Error(errorObj.error.message);
  }

  return;
}
