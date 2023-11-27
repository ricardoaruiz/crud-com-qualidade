import { markTodoAsDone } from "@db-crud-todo";
import { Todo } from "core/types";
import { todoRepository } from ".";

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

  if (!foundTodo) {
    throw new Error("Todo not found.", {
      cause: "NOT_FOUND",
    });
  }

  const done = !foundTodo.done;

  return markTodoAsDone(id, done);
}
