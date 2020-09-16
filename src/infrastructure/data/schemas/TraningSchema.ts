import mongoose, { Schema } from 'mongoose';

export interface TraningDoc extends mongoose.Document {
  _id: string;
  rutineId: string;
  logs: { id: string, kg: number; reps: number; series: number; exerciceId: string }[];
  creationDate: Date;
}

const traningSchema = new Schema(
  {
    rutineId: {
      type: String,
      required: true,
    },
    logs: {
      type: Array,
    },
  },
  { timestamps: true }
);

export const TrainingModel = mongoose.model<TraningDoc>(
  'Training',
  traningSchema
);
