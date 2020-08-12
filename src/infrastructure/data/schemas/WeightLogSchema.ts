import mongoose, { Schema } from 'mongoose';

export interface WeightLogDoc extends mongoose.Document {
  _id: string;
  userId: string;
  exerciceId: string;
  stats: { kg: number; reps: number; series: number };
  date: Date;
  creationDate: Date;
}

const logSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    exerciceId: {
      type: String,
      required: true,
    },
    stats: {
      type: Object,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const WeightLogModel = mongoose.model<WeightLogDoc>(
  'WeightLog',
  logSchema
);
