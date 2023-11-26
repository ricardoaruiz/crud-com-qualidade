import { readTodos, createTodo } from "@db-crud-todo";

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
 * Retrieves a list of todos based on the provided parameters.
 *
 * @param {TodoRepositoryGetParams} params - The parameters for the get operation.
 * @param {number} params.page - The page number to retrieve.
 * @param {number} params.limit - The maximum number of todos to retrieve per page.
 * @param {string} params.search - The search string to filter todos by their content.
 * @returns {Promise<TodosRepositoryGetOutput>} A promise that resolves to the retrieved todos.
 */
const get = async ({
  page,
  limit,
  search,
}: TodoRepositoryGetParams): Promise<TodosRepositoryGetOutput> => {
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

/**
 * Creates a new post with the given content.
 *
 * @param {string} content - The content of the post.
 * @return {Promise<Todo>} - A Promise that resolves to the created post.
 */
const post = async (content: string): Promise<Todo> => {
  return createTodo(content);
};

export const todoRepository = {
  get,
  post,
};
