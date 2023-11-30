import { z as schema } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { todoRepository } from "@server/repository";
import { HttpBadRequestException } from "@server/infra/exceptions/HttpBadRequestException";
import { HttpInternalServerErrorException } from "@server/infra/exceptions/HttpInternalServerErrorException";
import { HttpBaseException } from "@server/infra/exceptions/HttpBaseException";

interface ValidateInputsOutput {
  id: string;
}

/**
 * Validate the inputs of the request and return the parsed parameters.
 *
 * @param {NextApiRequest} req - The request object.
 * @return {ValidateInputsOutput} An object containing the parsed parameters.
 */
function validateInputs(req: NextApiRequest): ValidateInputsOutput {
  const parsedParams = schema.string().uuid().safeParse(req.query.id);

  if (!parsedParams.success) {
    throw new HttpBadRequestException("Invalid id.");
  }

  return {
    id: parsedParams.data,
  };
}

/**
 * Chande todo done information contreoller
 * @param req request
 * @param res response
 */
export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const { id } = validateInputs(req);

    const updatedTodo = await todoRepository.toggleDone({
      id,
    });

    res.status(200).json(updatedTodo);
  } catch (error: unknown) {
    if (error instanceof HttpBaseException) {
      return res.status(error.status).json(error.toObject());
    }
    if (error instanceof Error) {
      const unexpectedError = new HttpInternalServerErrorException(
        error.message,
      );
      return res
        .status(unexpectedError.status)
        .json(unexpectedError.toObject());
    }
  }
}
