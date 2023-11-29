import { deleteTodo } from "@db-crud-todo";
import { todoRepository } from ".";
import { ServerRepositoryNotFound } from "../exceptions/ServerRepositoryNotFound";

interface DelteTodoInput {
  id: string;
}

/**
 * Deletes a todo item.
 *
 * @param {DelteTodoInput} id - The ID of the todo item to be deleted.
 * @throws {ServerRepositoryNotFound} If the todo item is not found.
 * @return {Promise<void>} A promise that resolves with no value.
 */
export default async function ({ id }: DelteTodoInput): Promise<void> {
  const todoToDelete = await todoRepository.findOne({ id });

  if (!todoToDelete) {
    throw new ServerRepositoryNotFound("Todo not found");
  }

  deleteTodo(id);
}
