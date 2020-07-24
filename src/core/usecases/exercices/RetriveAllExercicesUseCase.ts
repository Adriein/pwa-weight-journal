import { Result, Repository, UseCase, Exercice } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';

export class RetriveAllExercicesUseCase implements UseCase<Exercice> {
  constructor(private exerciceRepo: Repository<Exercice>) {}

  async execute(): Promise<Result<Exercice>> {
    try {
      return new Result<Exercice>(await this.exerciceRepo.findMany({}));
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
