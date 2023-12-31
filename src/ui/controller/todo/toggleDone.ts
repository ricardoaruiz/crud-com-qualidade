import { todoRepository } from "@ui/repository";
import { Todo } from "@ui/schema/todo";
import { UIControllerInvalidInput } from "@ui/controller/exceptions/UIControllerInvalidInput";
import { z as schema } from "zod";
import { UIControllerException } from "../exceptions/UIControllerException";

const ToggleDoneControllerParamsSchema = schema.object({
  id: schema.string().uuid(),
});

type ToggleDoneParams = schema.infer<typeof ToggleDoneControllerParamsSchema>;

/**
 * Posts the given content and returns a Promise that resolves to a Todo.
 *
 * @param {string} content - The content to be posted.
 * @return {Promise<Todo>} A Promise that resolves to a Todo.
 */
export default async function (
  params: ToggleDoneParams & { id: string },
): Promise<Todo> {
  const parsedParams = ToggleDoneControllerParamsSchema.safeParse(params);

  if (!parsedParams.success) {
    throw new UIControllerInvalidInput("Invalid input", "id");
  }

  try {
    return await todoRepository.toggleDone({ id: parsedParams.data.id });
  } catch (error) {
    const errorObj = error as Error;
    throw new UIControllerException(errorObj.message);
  }
}
