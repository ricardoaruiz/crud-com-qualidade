import { NextApiRequest, NextApiResponse } from "next";
import { z as schema } from "zod";
import { ServerControllerBadRequest } from "../exceptions/ServerControllerBadRequest";
import { ServerControllerGeneralException } from "../exceptions/ServerControllerGeneralException";
import { ServerRepositoryNotFound } from "@server/repository/exceptions/ServerRepositoryNotFound";
import { todoRepository } from "@server/repository";

const DeleteTodoParamsSchema = schema.object({
  id: schema.string().uuid(),
});

type DeleteTodoParams = schema.infer<typeof DeleteTodoParamsSchema>;

/**
 * Validates the given params and returns the id.
 *
 * @param {unknown} params - The params to be validated.
 * @throws {ServerControllerBadRequest} Throws an error if the params are invalid.
 * @return {DeleteTodoParams} The validated id.
 */
function validateParams(params: unknown): DeleteTodoParams {
  const parsedParams = DeleteTodoParamsSchema.safeParse(params);

  if (!parsedParams.success) {
    throw new ServerControllerBadRequest("Invalid id.");
  }

  const { id } = parsedParams.data;
  return { id };
}

/**
 * Handles the request to remove an item.
 *
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @return {Promise<void>} A promise that resolves when the function completes.
 */
export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const { id } = validateParams(req.query);

    await todoRepository.remove({ id });

    res.status(204).json({ removedId: id });
  } catch (error: unknown) {
    if (error instanceof ServerControllerBadRequest) {
      res.status(400).json(error.toObject());
      return;
    }
    if (error instanceof ServerRepositoryNotFound) {
      res
        .status(404)
        .json(new ServerControllerGeneralException(error.message).toObject());
      return;
    }
    if (error instanceof Error) {
      res
        .status(500)
        .json(new ServerControllerGeneralException(error.message).toObject());
      return;
    }
  }
}
