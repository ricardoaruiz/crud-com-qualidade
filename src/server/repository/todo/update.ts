import { markTodoAsDone } from "@db-crud-todo";
import { Todo } from "core/types";

type UpdateTodoInput = {
  id: string;
  done: boolean;
};

export default async function ({ id, done }: UpdateTodoInput): Promise<Todo> {
  return markTodoAsDone(id, done);
}
