import { Exercice, Result, Repository, UseCase } from '../../entities';
import { AlreadyExists, CustomError, UnExpectedError } from '../../errors';
import { isEmpty } from '../../helpers';

export class CreateExerciceUseCase implements UseCase<Exercice> {
  constructor(private repository: Repository<Exercice>) {}

  async execute(body: Exercice): Promise<Result<Exercice>> {
    try {
      const { name } = body;

      //Check if the exercice already exists
      const exerciceOnDb = await this.repository.findOne(name.toLowerCase());

      body.name = body.name.toLowerCase();

      if (!isEmpty(exerciceOnDb))
        throw new AlreadyExists('Exercice already exists in DB');

      const createdExercice = await this.repository.save(body);

      return new Result<Exercice>([createdExercice]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new UnExpectedError(error.message);
    }
  }
}
