import mongoose, { Schema } from 'mongoose';

export interface ExerciceDoc extends mongoose.Document {
  _id: string;
  name: string;
  category: string;
}

const exerciceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export const ExerciceModel = mongoose.model<ExerciceDoc>(
  'Exercice',
  exerciceSchema
);
