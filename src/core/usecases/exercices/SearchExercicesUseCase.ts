import { Result, Repository, UseCase, Exercice } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';

export class SearchExercicesUseCase implements UseCase<Exercice> {
  constructor(private exerciceRepo: Repository<Exercice>) {}

  async execute(search: string): Promise<Result<Exercice>> {
    try {
      return new Result<Exercice>(
        await this.exerciceRepo.findMany({
          name: new RegExp(search.toLowerCase(), 'i'),
        })
      );
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
