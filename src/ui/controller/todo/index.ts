import create from "./create";
import get from "./read";
import filterTodosByContent from "./filterByContent";
import toggleDone from "./toggleDone";
import remove from "./remove";

export const todoController = {
  create,
  get,
  filterTodosByContent,
  toggleDone,
  remove,
};
