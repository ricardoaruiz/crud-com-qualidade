import { markTodoAsDone } from "@db-crud-todo";
import { Todo } from "core/types";
import { todoRepository } from ".";
import { RepositoryNotFound } from "../exceptions/RepositoryNotFound";

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
    throw new RepositoryNotFound("Todo not found.");
  }

  const done = !foundTodo.done;

  return markTodoAsDone(id, done);
}
