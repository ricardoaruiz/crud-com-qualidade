import { z as schema } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { todoRepository } from "@server/repository";
import { ServerRepositoryNotFound } from "@server/repository/exceptions/ServerRepositoryNotFound";
import { ServerControllerBadRequest } from "@server/controller/exceptions/ServerControllerBadRequest";
import { ServerControllerException } from "../exceptions/ServerControllerException";

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
    throw new ServerControllerBadRequest("Invalid id.");
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
    if (error instanceof ServerControllerBadRequest) {
      res.status(400).json({
        error: { message: error.message },
      } as ServerControllerException);
      return;
    }
    if (error instanceof ServerRepositoryNotFound) {
      res.status(404).json({
        error: { message: error.message },
      } as ServerControllerException);
      return;
    }
    if (error instanceof Error) {
      res.status(500).json({
        error: { message: error.message },
      } as ServerControllerException);
    }
  }
}
