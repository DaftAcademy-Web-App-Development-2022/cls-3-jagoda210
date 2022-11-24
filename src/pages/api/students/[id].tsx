import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "~/libraries/mongoose.library";
import { Student } from "~/models/Student.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === "GET") {
    const students = await getStudent(id as string);
    res.status(200).send({ data: students });
  } else if (req.method === "DELETE") {
    await deleteStudent(id as string);
    res.status(200).send({});
  }
}

async function getStudent(id: string) {
  const result = await Student.findById(id);
  if (!result) return null;
  const student = result.toObject();
  return {
    name: student.name,
  };
}

async function deleteStudent(id: string) {
  await Student.findByIdAndDelete(id);
}
