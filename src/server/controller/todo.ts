import { todoRepository } from "@server/repository/todo";
import { NextApiRequest, NextApiResponse } from "next";

const create = (req: NextApiRequest, res: NextApiResponse) => {
  req.body;
  res.status(201).json(req.body);
};

/**
 * Reads data from the API based on the provided request parameters.
 *
 * @param {NextApiRequest} req - The request object containing the query parameters.
 * @param {NextApiResponse} res - The response object used to send the data back to the client.
 * @return {void} The function does not return a value directly, but sends the data as a response.
 */
const read = (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, search } = req.query;

  const parsedPage = Number(page);
  if (page && isNaN(parsedPage)) {
    res.status(400).json({ message: "page must be a number" });
    return;
  }

  const parsedLimit = Number(limit);
  if (limit && isNaN(parsedLimit)) {
    res.status(400).json({ message: "limit must be a number" });
    return;
  }

  const params = {
    page: parsedPage,
    limit: parsedLimit,
    search: search ? String(search) : undefined,
  };

  const todos = todoRepository.get(params);
  res.status(200).json(todos);
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
