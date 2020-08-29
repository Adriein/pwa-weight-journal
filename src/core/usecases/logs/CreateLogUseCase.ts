import { Training, Result, Repository, UseCase } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';


export class CreateWeightLogUseCase implements UseCase<Training> {
  constructor(private repository: Repository<Training>) {}

  async execute(body: Training): Promise<Result<Training>> {
    try {
      const createdWeightLog = await this.repository.save(body);

      return new Result<Training>([createdWeightLog]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
