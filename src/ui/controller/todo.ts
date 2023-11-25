import { todoRepository } from "@ui/repository/todo";

interface TodoControllerGetParams {
  page: number;
  limit?: number;
  search?: string;
}

/**
 * Retrieves todos based on the provided parameters.
 *
 * @param {TodoControllerGetParams} params - The parameters for retrieving todos.
 * @return {Promise<Todo[]>} A promise that resolves to an array of todos.
 */
const get = async ({ page, limit, search }: TodoControllerGetParams) => {
  return todoRepository.get({ page: page || 1, limit: limit || 10, search });
};

/**
 * Filters todos by content.
 *
 * @param {string} search - The search string to filter todos by.
 * @param {Array<Todo & { content: string }>} todos - The array of todos to filter.
 * @return {Array<Todo>} - The filtered array of todos.
 */
function filterTodosByContent<Todo>(
  search: string,
  todos: Array<Todo & { content: string }>,
): Array<Todo> {
  return todos.filter(({ content }) =>
    content.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );
}

/**
 * The todo controller UI.
 */
export const todoController = {
  get,
  filterTodosByContent,
};
