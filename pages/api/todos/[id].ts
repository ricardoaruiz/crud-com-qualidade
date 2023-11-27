import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT": {
      todoController.update(req, res);
      break;
    }
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
