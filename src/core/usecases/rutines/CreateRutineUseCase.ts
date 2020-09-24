import { Rutine, Result, Repository, UseCase } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';

export class CreateRutineUseCase implements UseCase<Rutine> {
  constructor(private repository: Repository<Rutine>) {}

  async execute(body: Rutine): Promise<Result<Rutine>> {
    try {
      if (body.name) {
        body.name = body.name.toLowerCase();
      }

      const createdRutine = await this.repository.save(body);

      return new Result<Rutine>([createdRutine]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
