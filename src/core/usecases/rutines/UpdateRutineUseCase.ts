import { Rutine, Result, Repository, UseCase } from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';
import { NotFound } from '../../errors/NotFound';

export class UpdateRutineUseCase implements UseCase<Rutine> {
  constructor(private repository: Repository<Rutine>) {}

  async execute(body: Rutine): Promise<Result<Rutine>> {
    try {
      if (body.name) {
        body.name = body.name.toLowerCase();
      }
      
      const rutineOnDb = await this.repository.findOne(body.id!);
      
      if (!rutineOnDb) {
        throw new NotFound(`Rutine with id: ${body.id!} not found`);
      }

      const updatedRutine = await this.repository.update(body.id!, body);

      return new Result<Rutine>([updatedRutine]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
