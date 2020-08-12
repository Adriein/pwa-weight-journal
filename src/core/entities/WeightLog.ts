export interface WeightLog {
  id: string;
  name?: string;
  userId: string;
  exerciceId: string;
  stats: { kg: number; reps: number; series: number };
  date: Date;
  creationDate: Date;
}
