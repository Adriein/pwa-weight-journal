import { WeightLog, Result, Repository, UseCase } from '../../entities';
import { AlreadyExists, CustomError, UnExpectedError } from '../../errors';
import { isEmpty } from '../../helpers';

export class CreateWeightLogUseCase implements UseCase<WeightLog> {
  constructor(private repository: Repository<WeightLog>) {}

  async execute(body: WeightLog): Promise<Result<WeightLog>> {
    try {
      const createdWeightLog = await this.repository.save(body);

      return new Result<WeightLog>([createdWeightLog]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
