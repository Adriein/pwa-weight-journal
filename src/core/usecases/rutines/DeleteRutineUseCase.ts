import { Rutine, Result, Repository, UseCase } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';

export class DeleteRutineUseCase implements UseCase<Number> {
  constructor(private repository: Repository<Rutine>) {}

  async execute(id: string): Promise<Result<Number>> {
    try {
      const deletedRutines = await this.repository.delete(id);

      return new Result<Number>([deletedRutines]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
