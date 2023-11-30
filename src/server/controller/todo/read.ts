import { z as schema } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { todoRepository } from "@server/repository/todo";
import { HttpBadRequestException } from "@server/infra/exceptions/HttpBadRequestException";
import { HttpInternalServerErrorException } from "@server/infra/exceptions/HttpInternalServerErrorException";

const TodoReadParamsSchema = schema.object({
  page: schema.string().regex(/^\d+$/).optional(),
  limit: schema.string().regex(/^\d+$/).optional(),
  search: schema.string().optional(),
});

interface ValidateInputsOutput {
  page: number;
  limit: number;
  search?: string;
}

/**
 * Validates the inputs of the given request object and returns the parsed parameters.
 *
 * @param {NextApiRequest} req - The request object to validate.
 * @return {ValidateInputsOutput} The parsed parameters.
 */
function validateInputs(req: NextApiRequest): ValidateInputsOutput {
  const parsedParams = TodoReadParamsSchema.safeParse(req.query);

  if (!parsedParams.success) {
    const errors = parsedParams.error.issues.map(
      (issue) => `${issue.path[0]} must be a number`,
    );

    throw new HttpBadRequestException(
      `Invalid query parameters. ${errors.join(", ")}`,
    );
  }
  const { page, limit, search } = parsedParams.data;

  return {
    page: Number(page),
    limit: Number(limit),
    search,
  };
}

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
  try {
    const params = validateInputs(req);
    const todos = await todoRepository.get(params);
    res.status(200).json(todos);
  } catch (error: unknown) {
    if (error instanceof HttpBadRequestException) {
      return res.status(error.status).json(error.toObject());
    }
    if (error instanceof Error) {
      const genericError = new HttpInternalServerErrorException(error.message);
      return res.status(genericError.status).json(genericError.toObject());
    }
  }
}
