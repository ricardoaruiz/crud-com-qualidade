import { NextApiRequest, NextApiResponse } from "next";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { id } = req.query;

  res.status(204).json({ removedId: id });
}
