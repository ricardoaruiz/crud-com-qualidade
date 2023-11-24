import { todoRepository } from "@ui/repository/todo";

interface TodoControllerGetParams {
  page: number;
  limit?: number;
}

const get = async ({ page, limit }: TodoControllerGetParams) => {
  return todoRepository.get({ page: page || 1, limit: limit || 10 });
};

export const todoController = {
  get,
};
