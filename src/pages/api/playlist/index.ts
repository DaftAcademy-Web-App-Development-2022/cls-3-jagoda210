import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "~/libraries/mongoose.library";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();
  res.status(200).send({});
}

export type Response = any;
