import { model, models, Schema } from "mongoose";

interface StudentModel {
  name: string;
}

const schema = new Schema<StudentModel>({
  name: { type: String, required: true },
});

export const Student = models.Student || model<StudentModel>("Student", schema);
