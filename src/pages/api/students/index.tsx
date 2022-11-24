import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "~/libraries/mongoose.library";
import { Student } from "~/models/Student.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const students = await getStudents();
    res.status(200).send({ data: students });
  } else if (req.method === "POST") {
    await createStudent(req.body);
    res.status(201).send({});
  }
}

async function getStudents() {
  const result = await Student.find();
  return result.map((doc) => {
    return {
      id: doc._id,
      name: doc.name,
    };
  });
}

async function createStudent(obj: unknown) {
  await Student.create(obj);
}
