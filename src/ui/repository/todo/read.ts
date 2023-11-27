import { z as schema } from "zod";
import { TodoSchema } from "@ui/schema/todo";

const TODOS_URL = "api/todos";

interface TodoRepositoryGetParams {
  page: number;
  limit: number;
  search?: string;
}

const TodoRepositoryGetOuputSchema = schema.object({
  todos: schema.array(TodoSchema),
  total: schema.number(),
  pages: schema.number(),
});

type TodoRespositoryGetOuput = schema.infer<
  typeof TodoRepositoryGetOuputSchema
>;

/**
 * Retrieves a paginated list of todos from the specified API.
 *
 * @param {TodoRepositoryGetParams} params - The parameters for the GET request.
 * @param {number} params.page - The page number to retrieve.
 * @param {number} params.limit - The maximum number of todos per page.
 * @param {number} params.search - Search term to filter todos.
 * @return {Promise<TodoRespositoryGetOuput>} A promise that resolves to the paginated todos.
 */
export default async function ({
  page,
  limit,
  search = "",
}: TodoRepositoryGetParams): Promise<TodoRespositoryGetOuput> {
  const URL = `${TODOS_URL}?${new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
  }).toString()}`;

  const response = await fetch(URL);
  const data = await response.json();

  const parsedTodos = TodoRepositoryGetOuputSchema.safeParse(data);

  if (!parsedTodos.success) {
    throw new Error("Failed to get todos");
  }

  const { todos, total, pages } = parsedTodos.data;

  return {
    todos,
    total,
    pages,
  };
}
