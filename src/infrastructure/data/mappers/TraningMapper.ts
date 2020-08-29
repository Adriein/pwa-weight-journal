import { Training } from '../../../core/entities';
import { TraningDoc } from '../schemas';

export class WeightLogMapper {
  logSchemaToDomainTraining({
    _id,
    userId,
    logs,
    date,
    creationDate,
  }: TraningDoc): Training {
    return { id: _id, userId, logs, date, creationDate } as Training;
  }

  logsSchemaToDomainTrainings(trainings: TraningDoc[]): Training[] {
    return trainings.map((training) => {
      return {
        id: training._id,
        userId: training.userId,
        logs: training.logs,
        date: training.date,
        creationDate: training.creationDate,
      } as Training;
    });
  }
}
