import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      todoController.get(req, res);
      break;
    }
    default: {
      res.status(405).json({ message: "Method not allowed" });
      break;
    }
  }
}
