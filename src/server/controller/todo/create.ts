import { z as schema } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { todoRepository } from "@server/repository/todo";
import { HttpBadRequestException } from "@server/infra/exceptions/HttpBadRequestException";
import { HttpInternalServerErrorException } from "@server/infra/exceptions/HttpInternalServerErrorException";

const TodoCreateBodySchema = schema.object({
  content: schema.string().min(10),
});

/**
 * Validate the inputs of the request and return the parsed parameters.
 */
function validateInputs(req: NextApiRequest): string {
  const body = TodoCreateBodySchema.safeParse(req.body);

  if (!body.success) {
    throw new HttpBadRequestException(
      "Invalid content. Content must be at least 10 characters",
    );
  }

  return body.data.content;
}

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
  try {
    const content = validateInputs(req);

    const createdTodo = await todoRepository.post(content);
    res.status(201).json(createdTodo);
  } catch (error) {
    if (error instanceof HttpBadRequestException) {
      return res.status(error.status).json(error.toObject());
    }
    if (error instanceof Error) {
      const genericError = new HttpInternalServerErrorException(error.message);
      return res.status(genericError.status).json(genericError.toObject());
    }
  }
}
