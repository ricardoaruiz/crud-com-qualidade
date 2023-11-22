const TODOS_URL = "api/todos";
const get = async () => {
  const response = await fetch(TODOS_URL);
  const data = await response.json();
  return data.todos || [];
};

export const todoController = {
  get,
};
