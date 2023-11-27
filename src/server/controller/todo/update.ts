import { NextApiRequest, NextApiResponse } from "next";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { id } = req.query;
  req.body;

  res.status(200).json({ id, todo: req.body });
}
