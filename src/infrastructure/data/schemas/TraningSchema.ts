import mongoose, { Schema } from 'mongoose';

export interface TraningDoc extends mongoose.Document {
  _id: string;
  userId: string;
  exerciceId: string;
  logs: { id: string, kg: number; reps: number; series: number; exerciceId: string }[];
  date: Date;
  creationDate: Date;
}

const traningSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    logs: {
      type: Array,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const TrainingModel = mongoose.model<TraningDoc>(
  'Training',
  traningSchema
);
