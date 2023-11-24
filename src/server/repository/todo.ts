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
 * @returns {object} - An object containing the paginated todos, total count, and number of pages.
 */
const get = ({
  page,
  limit,
}: TodoRepositoryGetParams): TodosRepositoryGetOutput => {
  const ALL_TODOS = readTodos();

  const currentPage = page || 1;
  const currentLimit = limit || 10;

  const startIndex = (currentPage - 1) * currentLimit;
  const endIndex = currentPage * currentLimit;

  const todos = ALL_TODOS.slice(startIndex, endIndex);
  const pages = Math.ceil(ALL_TODOS.length / currentLimit);
  const total = ALL_TODOS.length;

  return {
    todos,
    total,
    pages,
  };
};

export const todoRepository = {
  get,
};
