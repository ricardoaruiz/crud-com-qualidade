import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      todoController.create(req, res);
      break;
    }
    case "GET": {
      todoController.read(req, res);
      break;
    }
    case "PUT": {
      todoController.update(req, res);
      break;
    }
    case "DELETE": {
      todoController.delete(req, res);
      break;
    }
    default: {
      res.status(405).json({ message: "Method not allowed" });
      break;
    }
  }
}
