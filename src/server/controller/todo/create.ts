import { z as schema } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { todoRepository } from "@server/repository/todo";

const TodoCreateBodySchema = schema.object({
  content: schema.string(),
});

/**
 * Creates a new resource.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @return {Promise<void>} This function does not return anything.
 */
export default async function (
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
