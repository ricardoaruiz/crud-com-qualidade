import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

/**
 * Handles the request and response for the API endpoint.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {void}
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): void {
  switch (req.method) {
    case "DELETE": {
      todoController.remove(req, res);
      break;
    }
    default: {
      res.status(405).json({ error: { message: "Method not allowed" } });
      break;
    }
  }
}
