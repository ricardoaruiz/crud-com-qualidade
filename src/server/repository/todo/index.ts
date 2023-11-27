import post from "./create";
import get from "./read";
import toggleDone from "./toggleDone";
import findOne from "./findOne";

export const todoRepository = {
  post,
  get,
  toggleDone,
  findOne,
};
