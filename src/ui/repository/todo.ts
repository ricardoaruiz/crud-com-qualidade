const TODOS_URL = "api/todos";

interface Todo {
  id: string;
  content: string;
  date: Date;
  done: boolean;
}

interface TodoRepositoryGetParams {
  page: number;
  limit: number;
}

interface TodoRespositoryGetOuput {
  todos: Todo[];
  total: number;
  pages: number;
}

/**
 * Parses the given data and returns an array of Todo objects.
 *
 * @param {unknown} data - The data to be parsed.
 * @return {Todo[]} An array of Todo objects.
 */
const parseTodos = (data: unknown): Todo[] => {
  if (
    data !== null &&
    typeof data === "object" &&
    "todos" in data &&
    Array.isArray(data.todos)
  ) {
    return data.todos.map((todo: unknown) => {
      if (todo === null && typeof todo !== "object") {
        throw new Error("Invalid todo from API");
      }

      const { id, content, date, done } = todo as {
        id: string;
        content: string;
        date: string;
        done: string;
      };

      return {
        id,
        content,
        date: new Date(date),
        done: String(done).toLowerCase() === "true",
      };
    });
  }

  return [];
};

/**
 * Retrieves a paginated list of todos from the specified API.
 *
 * @param {TodoRepositoryGetParams} params - The parameters for the GET request.
 * @param {number} params.page - The page number to retrieve.
 * @param {number} params.limit - The maximum number of todos per page.
 * @return {Promise<TodoRespositoryGetOuput>} A promise that resolves to the paginated todos.
 */
async function get({
  page,
  limit,
}: TodoRepositoryGetParams): Promise<TodoRespositoryGetOuput> {
  const response = await fetch(TODOS_URL);
  const data = await response.json();

  const allTodos = parseTodos(data);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedTodos = allTodos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allTodos.length / limit);

  return {
    todos: paginatedTodos,
    total: paginatedTodos.length,
    pages: totalPages,
  };
}

export const todoRepository = {
  get,
};
