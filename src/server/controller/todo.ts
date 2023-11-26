import { z as schema } from "zod";
import { todoRepository } from "@server/repository/todo";
import { NextApiRequest, NextApiResponse } from "next";

const TodoCreateBodySchema = schema.object({
  content: schema.string(),
});

const TodoReadParamsSchema = schema.object({
  page: schema.string().regex(/^\d+$/).optional(),
  limit: schema.string().regex(/^\d+$/).optional(),
  search: schema.string().optional(),
});

/**
 * Creates a new resource.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @return {Promise<void>} This function does not return anything.
 */
async function create(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const body = TodoCreateBodySchema.safeParse(req.body);

  if (!body.success) {
    res.status(400).json({
      message: "content is required",
      description: body.error.issues,
    });
    return;
  }

  const createdTodo = await todoRepository.post(body.data.content);

  res.status(201).json(createdTodo);
}

/**
 * Reads data from the API.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @return {Promise<void>} - A promise that resolves to void.
 */
const read = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const parsedParams = TodoReadParamsSchema.safeParse(req.query);

  if (!parsedParams.success) {
    const errors = parsedParams.error.issues.map((issue) => ({
      message: `invalid ${issue.path[0]}`,
      description: "must be a number",
    }));

    res.status(400).json(errors);
    return;
  }

  const params = {
    page: Number(parsedParams.data.page),
    limit: Number(parsedParams.data.limit),
    search: parsedParams.data.search
      ? String(parsedParams.data.search)
      : undefined,
  };

  const todos = await todoRepository.get(params);
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
