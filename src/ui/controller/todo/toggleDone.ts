import { todoRepository } from "@ui/repository";
import { Todo } from "@ui/schema/todo";
import { UIControllerInvalidInput } from "@ui/controller/exceptions/UIControllerInvalidInput";
import { z as schema } from "zod";

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
    throw new UIControllerInvalidInput(
      "Invalid input",
      parsedParams.error.issues[0].path[0].toString(),
    );
  }

  const { id } = parsedParams.data;

  return todoRepository.toggleDone({ id });
}
