import { supabase } from "@server/infra/supabase";
import { Todo, TodoSchema } from "@server/schema/todo";
import { todoRepository } from ".";
import { HttpInvalidParsedDataException } from "@server/infra/exceptions";

type UpdateTodoInput = {
  id: string;
};

/**
 * Toggle the done status of a todo.
 * @param id Todo id
 * @returns Todo
 */
export default async function ({ id }: UpdateTodoInput): Promise<Todo> {
  const foundTodo = await todoRepository.findOne({ id });

  const { data } = await supabase
    .from("todos")
    .update({ done: !foundTodo?.done })
    .eq("id", id)
    .select();

  const parsedData = TodoSchema.array().safeParse(data);

  if (!parsedData.success) {
    throw new HttpInvalidParsedDataException(
      "Invalid updated todo format received from database",
    );
  }

  return parsedData.data[0];
}
