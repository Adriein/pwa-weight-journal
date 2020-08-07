import { Result, Repository, UseCase, Exercice } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';

export class RetriveAllExercicesByCategoryUseCase implements UseCase<Exercice> {
  constructor(private exerciceRepo: Repository<Exercice>) {}

  async execute(category: string): Promise<Result<Exercice>> {
    try {
      return new Result<Exercice>(
        await this.exerciceRepo.findMany({ category })
      );
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
