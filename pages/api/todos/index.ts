import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

/**
 * Handles the API request and routes it to the appropriate controller method based on the request method.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 * @return {void}
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): void {
  switch (req.method) {
    case "POST": {
      todoController.create(req, res);
      break;
    }
    case "GET": {
      todoController.read(req, res);
      break;
    }
    default: {
      res.status(405).json({ message: "Method not allowed 1" });
      break;
    }
  }
}
