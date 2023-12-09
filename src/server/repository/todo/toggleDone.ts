import { SUPABASE_FROM } from "@server/infra/supabase/constants";
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

  const { data } = await SUPABASE_FROM.todos()
    .update({ done: !foundTodo?.done })
    .eq("id", id)
    .select()
    .single();

  const parsedData = TodoSchema.safeParse(data);

  if (!parsedData.success) {
    throw new HttpInvalidParsedDataException(
      "Invalid updated todo format received from database",
    );
  }

  return parsedData.data;
}
