import post from "./create";
import get from "./read";
import filterTodosByContent from "./filterByContent";
import put from "./update";

export const todoController = {
  post,
  get,
  filterTodosByContent,
  put,
};
