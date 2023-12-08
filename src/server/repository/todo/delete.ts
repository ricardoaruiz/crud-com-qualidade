import { supabase } from "@server/infra/supabase";
import findOne from "./findOne";

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

  await supabase
    .from("todos")
    .delete()
    .eq("id", todoToRemove?.id);
}
