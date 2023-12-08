import { supabase } from "@server/infra/supabase";
import findOne from "./findOne";
import { HttpInternalServerErrorException } from "@server/infra/exceptions";

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
  const todoToRemove = await findOne({ id });

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", todoToRemove?.id);

  if (error) {
    throw new HttpInternalServerErrorException("Todo not found");
  }
}
