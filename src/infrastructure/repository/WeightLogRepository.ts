import { Training, Repository } from '../../core/entities';
import { TrainingModel, TraningDoc } from '../data/schemas';
import { WeightLogMapper } from '../data/mappers/TraningMapper';

export class WeightLogRepository implements Repository<Training> {
  private mapper: WeightLogMapper;

  constructor() {
    this.mapper = new WeightLogMapper();
  }

  async findMany(searchObj: any): Promise<Training[]> {
    const log: TraningDoc[] = await TrainingModel.find(searchObj).exec();
    if (log.length === 0) return [];
    return this.mapper.logsSchemaToDomainTrainings(log);
  }

  async findOne(id: string): Promise<Training> {
    const response = await TrainingModel.findOne({ _id: id }).exec();
    if (response !== null)
      return this.mapper.logSchemaToDomainTraining(response);
    return {} as Training;
  }

  async save(body: Training): Promise<Training> {
    return this.mapper.logSchemaToDomainTraining(
      await new TrainingModel(body).save()
    );
  }

  async update(id: string, body: Training): Promise<Training> {
    throw new Error();
  }

  async delete(id: string): Promise<number> {
    throw new Error();
  }
}
