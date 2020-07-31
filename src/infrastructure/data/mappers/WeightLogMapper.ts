import { WeightLog } from '../../../core/entities';
import { WeightLogDoc } from '../schemas';

export class WeightLogMapper {
  logSchemaToDomainWeightLog({
    _id,
    exerciceId,
    stats,
    date,
    creationDate,
  }: WeightLogDoc): WeightLog {
    return { id: _id, exerciceId, stats, date, creationDate } as WeightLog;
  }

  logsSchemaToDomainWeightLogs(logs: WeightLogDoc[]): WeightLog[] {
    return logs.map((log) => {
      return {
        id: log._id,
        exerciceId: log.exerciceId,
        stats: log.stats,
        date: log.date,
        creationDate: log.creationDate,
      } as WeightLog;
    });
  }
}
