import { todoRepository } from "@ui/repository";
import { Todo } from "@ui/schema/todo";
import { z as schema } from "zod";

/**
 * Posts the given content and returns a Promise that resolves to a Todo.
 *
 * @param {string} content - The content to be posted.
 * @return {Promise<Todo>} A Promise that resolves to a Todo.
 */
export default async function post(content: string): Promise<Todo> {
  const parsedParams = schema.string().min(1).safeParse(content);

  if (!parsedParams.success) {
    throw new Error("Invalid content");
  }

  return todoRepository.post(parsedParams.data);
}
