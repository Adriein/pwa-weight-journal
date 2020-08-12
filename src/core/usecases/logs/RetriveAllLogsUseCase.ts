import {
  WeightLog,
  Result,
  Repository,
  UseCase,
  Exercice,
} from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';

export class RetriveAllLogsUseCase implements UseCase<WeightLog> {
  constructor(
    private repository: Repository<WeightLog>,
    private exerciceRepository: Repository<Exercice>
  ) {}

  async execute(): Promise<Result<WeightLog>> {
    try {

      //Agrupate logs by number passed by params to the execute function
      const now = new Date();
      const until = now.setDate(now.getDate() - 5);
      console.log(new Date(until))

      //Hydratate the logs including the name of the exercice for visualitzation propouses
      const allLogs = await this.repository.findMany({});

      const hydratedLogs = await Promise.all(
        allLogs.map(async (log) => {
          const [exercice] = await this.exerciceRepository.findMany({
            _id: log.exerciceId,
          });
          log.name = exercice.name;
          return log;
        })
      );

      return new Result<WeightLog>(hydratedLogs);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
