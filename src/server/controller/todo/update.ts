import { z as schema } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { todoRepository } from "@server/repository";

interface ValidateInputsOutput {
  id: string;
  done: boolean;
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
    throw new Error("Invalid id.");
  }

  const parseBody = schema
    .object({
      done: schema.boolean(),
    })
    .safeParse(req.body);

  if (!parseBody.success) {
    throw new Error("Invalid done value. Must be true or false");
  }

  return {
    id: parsedParams.data,
    done: parseBody.data.done,
  };
}

export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const { id, done } = validateInputs(req);

    const updatedTodo = await todoRepository.put({ id, done });

    res.status(200).json(updatedTodo);
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
}
