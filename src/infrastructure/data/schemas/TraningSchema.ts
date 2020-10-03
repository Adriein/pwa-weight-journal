import mongoose, { Schema } from 'mongoose';

export interface TraningDoc extends mongoose.Document {
  _id: string;
  rutineId: string;
  userId: string;
  logs: {
    id: string;
    serie: { number: number; kg: number; reps: number };
    exerciceId: string;
  }[];
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
    userID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const TrainingModel = mongoose.model<TraningDoc>(
  'Training',
  traningSchema
);
