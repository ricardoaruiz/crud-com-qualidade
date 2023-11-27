import { todoRepository } from "@ui/repository";
import { Todo } from "@ui/schema/todo";
import { z as schema } from "zod";

const UpdateTodoControllerParamsSchema = schema.object({
  id: schema.string().uuid(),
  done: schema.boolean(),
});

type UpdateTodoParams = schema.infer<typeof UpdateTodoControllerParamsSchema>;

/**
 * Posts the given content and returns a Promise that resolves to a Todo.
 *
 * @param {string} content - The content to be posted.
 * @return {Promise<Todo>} A Promise that resolves to a Todo.
 */
export default async function (
  params: UpdateTodoParams & { id: string },
): Promise<Todo> {
  const parsedParams = UpdateTodoControllerParamsSchema.safeParse(params);

  if (!parsedParams.success) {
    const errors = parsedParams.error.issues.map((issue) => ({
      message: `invalid ${issue.path[0]}`,
      description: issue.message,
    }));

    throw new Error(JSON.stringify({ errors }));
  }

  const { id, done } = parsedParams.data;

  return todoRepository.put({ id, done });
}
