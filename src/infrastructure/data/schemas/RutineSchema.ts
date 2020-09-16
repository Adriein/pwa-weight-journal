import mongoose, { Schema } from 'mongoose';

export interface RutineDoc extends mongoose.Document {
  _id: string;
  userId: string;
  name: string;
  creationDate: Date;
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
  },
  { timestamps: true }
);

export const RutineModel = mongoose.model<RutineDoc>('Rutine', traningSchema);
