const TODOS_URL = "api/todos";

export interface Todo {
  id: string;
  content: string;
  date: Date;
  done: boolean;
}

interface TodoRepositoryGetParams {
  page: number;
  limit: number;
  search?: string;
}

interface TodoRespositoryGetOuput {
  todos: Todo[];
  total: number;
  pages: number;
}

/**
 * Retrieves a paginated list of todos from the specified API.
 *
 * @param {TodoRepositoryGetParams} params - The parameters for the GET request.
 * @param {number} params.page - The page number to retrieve.
 * @param {number} params.limit - The maximum number of todos per page.
 * @param {number} params.search - Search term to filter todos.
 * @return {Promise<TodoRespositoryGetOuput>} A promise that resolves to the paginated todos.
 */
async function get({
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
  const { todos, total, pages } = parseTodos(data);

  return {
    todos,
    total,
    pages,
  };
}

/**
 * The todo repository UI
 */
export const todoRepository = {
  get,
};

/**
 * Parses the given data and returns a TodoRespositoryGetOutput object.
 *
 * @param {unknown} data - The data to be parsed.
 * @return {TodoRespositoryGetOutput} The parsed TodoRespositoryGetOutput object.
 */
function parseTodos(data: unknown): TodoRespositoryGetOuput {
  if (
    data !== null &&
    typeof data === "object" &&
    "todos" in data &&
    "total" in data &&
    "pages" in data &&
    Array.isArray(data.todos) &&
    !isNaN(Number(data.total)) &&
    !isNaN(Number(data.pages))
  ) {
    return {
      total: Number(data.total),
      pages: Number(data.pages),
      todos: data.todos.map((todo) => {
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
      }),
    };
  }

  return {
    total: 0,
    pages: 1,
    todos: [],
  };
}
