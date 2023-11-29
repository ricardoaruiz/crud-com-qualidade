import { z as schema } from "zod";
import { UIControllerInvalidInput } from "../exceptions/UIControllerInvalidInput";
import { todoRepository } from "@ui/repository";
import { UIControllerException } from "../exceptions/UIControllerException";

const RemoveTodoControllerParamsSchema = schema.object({
  id: schema.string().uuid(),
});

type RemoveTodoControllerParams = schema.infer<
  typeof RemoveTodoControllerParamsSchema
>;

/**
 * Removes a todo.
 *
 * @param {RemoveTodoControllerParams} params - The parameters for removing the todo.
 * @throws {UIControllerInvalidInput} If the input is invalid.
 * @throws {UIControllerException} If an exception occurs during the removal.
 * @return {Promise<void>} A promise that resolves when the todo is removed.
 */
export default async function remove(
  params: RemoveTodoControllerParams,
): Promise<void> {
  const parsedParams = RemoveTodoControllerParamsSchema.safeParse(params);

  if (!parsedParams.success) {
    throw new UIControllerInvalidInput("Invalid input", "id");
  }

  try {
    await todoRepository.remove({ id: parsedParams.data.id });
  } catch (error) {
    const errorObj = error as Error;
    throw new UIControllerException(errorObj.message);
  }
}
