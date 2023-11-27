import { z as schema } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { todoRepository } from "@server/repository";

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
    throw new Error("Invalid id.", {
      cause: "BAD_REQUEST",
    });
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
    const parsedError = error as Error;

    switch (parsedError.cause) {
      case "NOT_FOUND":
        res.status(404).json({ message: parsedError.message });
        break;
      case "BAD_REQUEST":
        res.status(400).json({ message: parsedError.message });
        break;
      default:
        res.status(500).json({ message: parsedError.message });
        break;
    }
  }
}
