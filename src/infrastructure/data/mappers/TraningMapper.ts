import { Training } from '../../../core/entities';
import { TraningDoc } from '../schemas';

export class TrainingMapper {
  logSchemaToDomainTraining({
    _id,
    rutineId,
    logs,
    creationDate,
  }: TraningDoc): Training {
    return { id: _id, rutineId, logs, creationDate } as Training;
  }

  logsSchemaToDomainTrainings(trainings: TraningDoc[]): Training[] {
    return trainings.map((training) => {
      return {
        id: training._id,
        rutineId: training.rutineId,
        logs: training.logs,
        creationDate: training.creationDate,
      } as Training;
    });
  }
}
