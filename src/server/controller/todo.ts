import { readTodos } from "@db-crud-todo";
import { NextApiRequest, NextApiResponse } from "next";

const get = (_: NextApiRequest, res: NextApiResponse) => {
  const todos = readTodos();
  res.status(200).json({ todos });
};

export const todoController = {
  get,
};
