import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Handles the request and response for the API endpoint.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "DELETE": {
      todoController.remove(req, res);
      break;
    }
    default: {
      res.status(405).json({ message: "Method not allowed 2" });
      break;
    }
  }
}
