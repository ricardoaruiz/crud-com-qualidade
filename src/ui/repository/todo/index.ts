import post from "./create";
import get from "./read";
import toggleDone from "./toggleDone";
import remove from "./remove";

export const todoRepository = {
  post,
  get,
  toggleDone,
  remove,
};
