import mongoose, { Schema } from 'mongoose';

export interface RutineDoc extends mongoose.Document {
  _id: string;
  userId: string;
  name: string;
  description: string;
  exercices: string[];
  updatedAt: Date;
}

const traningSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    exercices: {
      type: Array,
    },
  },
  { timestamps: true }
);

export const RutineModel = mongoose.model<RutineDoc>('Rutine', traningSchema);
