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
 * Sends a POST request to the server with the specified content and returns a Promise that resolves to a Todo object.
 *
 * @param {string} content - The content of the todo.
 * @return {Promise<Todo>} A Promise that resolves to a Todo object.
 */
async function post(content: string): Promise<Todo> {
  const response = await fetch(TODOS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  });

  return parseTodo(await response.json());
}

/**
 * The todo repository UI
 */
export const todoRepository = {
  get,
  post,
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
      todos: data.todos.map((todo) => parseTodo(todo)),
    };
  }

  return {
    total: 0,
    pages: 1,
    todos: [],
  };
}

/**
 * Parses the given data and returns a Todo object.
 *
 * @param {unknown} data - The data to be parsed.
 * @return {Todo} The parsed Todo object.
 */
function parseTodo(data: unknown): Todo {
  if (data === null && typeof data !== "object") {
    throw new Error("Invalid todo from API");
  }

  const { id, content, date, done } = data as {
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
}
