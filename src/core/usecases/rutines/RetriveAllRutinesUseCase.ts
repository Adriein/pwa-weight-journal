import { Result, Repository, UseCase, Rutine } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';

export class RetriveAllRutinesUseCase implements UseCase<Rutine> {
  constructor(private rutineRepo: Repository<Rutine>) {}

  async execute(): Promise<Result<Rutine>> {
    try {
      return new Result<Rutine>(await this.rutineRepo.findMany({}));
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
