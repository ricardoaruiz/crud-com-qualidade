import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

/**
 * Handles the incoming API request and determines the appropriate action based on the request method.
 *
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {void}
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): void {
  switch (req.method) {
    case "PUT": {
      todoController.toggleDone(req, res);
      break;
    }
    default: {
      res.status(405).json({ error: { message: "Method not allowed" } });
      break;
    }
  }
}
