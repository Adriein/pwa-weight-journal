import { Category, Result, UseCase } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';

export class RetriveAllCategoriesUseCase implements UseCase<string> {
  constructor() {}

  async execute(): Promise<Result<string>> {
    try {
      return new Result<string>([
        Category.ABDOMEN,
        Category.ARM,
        Category.BACK,
        Category.CHEST,
        Category.LEGS,
        Category.SHOULDER,
      ]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
