import {
  Training,
  Result,
  Repository,
  UseCase,
  Exercice,
} from '../../entities';
import { CustomError, UnExpectedError } from '../../errors';

export class RetriveAllLogsUseCase implements UseCase<Training> {
  constructor(
    private repository: Repository<Training>,
    private exerciceRepository: Repository<Exercice>
  ) {}

  async execute(): Promise<Result<Training>> {
    throw new Error();
  }
}
