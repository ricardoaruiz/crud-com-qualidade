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

async function get({
  page,
  limit,
}: TodoRepositoryGetParams): Promise<TodoRespositoryGetOuput> {
  const response = await fetch(TODOS_URL);
  const data = await response.json();

  const allTodos: Todo[] = data.todos || [];
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
