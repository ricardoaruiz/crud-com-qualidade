import { todoRepository } from "@ui/repository";
import { Todo } from "@ui/schema/todo";

interface TodoControllerGetParams {
  page: number;
  limit?: number;
  search?: string;
}

interface TodoControllerGetOuput {
  todos: Todo[];
  total: number;
  pages: number;
}

/**
 * Retrieves a list of todos based on the provided parameters.
 *
 * @param {TodoControllerGetParams} page - The page number of the results.
 * @param {TodoControllerGetParams} limit - The maximum number of results per page.
 * @param {TodoControllerGetParams} search - The search query to filter results.
 * @return {Promise<TodoControllerGetOuput>} A promise that resolves to the list of todos.
 */
export default async function ({
  page,
  limit,
  search,
}: TodoControllerGetParams): Promise<TodoControllerGetOuput> {
  return todoRepository.get({ page: page || 1, limit: limit || 10, search });
}
