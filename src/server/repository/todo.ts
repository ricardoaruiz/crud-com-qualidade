import { readTodos } from "@db-crud-todo";

interface Todo {
  id: string;
  content: string;
  date: string;
  done: boolean;
}

interface TodoRepositoryGetParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface TodosRepositoryGetOutput {
  todos: Todo[];
  total: number;
  pages: number;
}

/**
 * Retrieves paginated todos based on the specified parameters.
 *
 * @param {TodoRepositoryGetParams} params - The parameters for pagination.
 * @param {number} params.page - The page number.
 * @param {number} params.limit - The number of todos per page.
 * @param {number} params.search - The search term.
 * @returns {object} - An object containing the paginated todos, total count, and number of pages.
 */
const get = ({
  page,
  limit,
  search,
}: TodoRepositoryGetParams): TodosRepositoryGetOutput => {
  const TODOS_FROM_DB = readTodos().filter((todo) => {
    if (search) {
      return todo.content
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
    }
    return true;
  });

  const currentPage = page || 1;
  const currentLimit = limit || 10;

  const startIndex = (currentPage - 1) * currentLimit;
  const endIndex = currentPage * currentLimit;

  const todos = TODOS_FROM_DB.slice(startIndex, endIndex);
  const pages = Math.ceil(TODOS_FROM_DB.length / currentLimit);
  const total = TODOS_FROM_DB.length;

  return {
    todos,
    total,
    pages,
  };
};

export const todoRepository = {
  get,
};
