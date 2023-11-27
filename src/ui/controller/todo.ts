import { todoRepository } from "@ui/repository/todo";
import { Todo } from "@ui/schema/todo";
import { z as schema } from "zod";

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
const get = async ({
  page,
  limit,
  search,
}: TodoControllerGetParams): Promise<TodoControllerGetOuput> =>
  todoRepository.get({ page: page || 1, limit: limit || 10, search });

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
 * Posts the given content and returns a Promise that resolves to a Todo.
 *
 * @param {string} content - The content to be posted.
 * @return {Promise<Todo>} A Promise that resolves to a Todo.
 */
function post(content: string): Promise<Todo> {
  const parsedParams = schema.string().min(1).safeParse(content);

  if (!parsedParams.success) {
    throw new Error("Invalid content");
  }

  return todoRepository.post(parsedParams.data);
}

/**
 * The todo controller UI.
 */
export const todoController = {
  get,
  filterTodosByContent,
  post,
};
