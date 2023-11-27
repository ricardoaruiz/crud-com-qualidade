import { z as schema } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { todoRepository } from "@server/repository/todo";

const TodoReadParamsSchema = schema.object({
  page: schema.string().regex(/^\d+$/).optional(),
  limit: schema.string().regex(/^\d+$/).optional(),
  search: schema.string().optional(),
});

/**
 * Reads data from the API.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @return {Promise<void>} - A promise that resolves to void.
 */
export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
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
}
