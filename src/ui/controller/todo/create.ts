import { todoRepository } from "@ui/repository";
import { Todo } from "@ui/schema/todo";
import { z as schema } from "zod";
import { UIControllerInvalidInput } from "../exceptions/UIControllerInvalidInput";
import { UIControllerException } from "../exceptions/UIControllerException";

/**
 * Posts a new todo item.
 *
 * @param {string} content - The content of the todo item.
 * @return {Promise<Todo>} The created todo item.
 */
export default async function (content: string): Promise<Todo> {
  const parsedParams = schema.string().min(1).safeParse(content);

  if (!parsedParams.success) {
    throw new UIControllerInvalidInput(
      "Invalid content.",
      "Content must be at least 10 characters",
    );
  }

  try {
    return await todoRepository.post(parsedParams.data);
  } catch (error) {
    const errorObj = error as Error;
    throw new UIControllerException(errorObj.message);
  }
}
