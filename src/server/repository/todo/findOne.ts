import { readTodos } from "@db-crud-todo";
import { Todo } from "@ui/schema/todo";

interface TodoRepositoryFindOneParams {
  id: string;
}

export default async function ({
  id,
}: TodoRepositoryFindOneParams): Promise<Todo | undefined> {
  return readTodos().find((todo) => todo.id === id);
}
