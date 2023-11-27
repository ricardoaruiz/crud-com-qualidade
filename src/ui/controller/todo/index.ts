import create from "./create";
import get from "./read";
import filterTodosByContent from "./filterByContent";
import toggleDone from "./toggleDone";

export const todoController = {
  create,
  get,
  filterTodosByContent,
  toggleDone,
};
