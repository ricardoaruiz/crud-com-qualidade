import { NextApiRequest, NextApiResponse } from "next";
import { z as schema } from "zod";
import { todoRepository } from "@server/repository";
import { HttpBadRequestException } from "@server/infra/exceptions/HttpBadRequestException";
import { HttpInternalServerErrorException } from "@server/infra/exceptions/HttpInternalServerErrorException";
import { HttpBaseException } from "@server/infra/exceptions/HttpBaseException";

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
    throw new HttpBadRequestException("Invalid id.");
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

    res.status(200).json({ removedId: id });
  } catch (error: unknown) {
    if (error instanceof HttpBaseException) {
      return res.status(error.status).json(error.toObject());
    }
    if (error instanceof Error) {
      const genericError = new HttpInternalServerErrorException(error.message);
      return res.status(genericError.status).json(genericError.toObject());
    }
  }
}
