import { readTodos } from "@db-crud-todo";
import { NextApiRequest, NextApiResponse } from "next";

const create = (req: NextApiRequest, res: NextApiResponse) => {
  req.body;
  res.status(201).json(req.body);
};

const read = (_: NextApiRequest, res: NextApiResponse) => {
  const todos = readTodos();
  res.status(200).json({ todos });
};

const update = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  req.body;

  res.status(200).json({ id, todo: req.body });
};

const remove = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  res.status(204).json({ removedId: id });
};

export const todoController = {
  create,
  read,
  update,
  delete: remove,
};
