import { WeightLog, Repository } from '../../core/entities';
import { WeightLogModel, WeightLogDoc } from '../data/schemas';
import { WeightLogMapper } from '../data/mappers/WeightLogMapper';

export class WeightLogRepository implements Repository<WeightLog> {
  private mapper: WeightLogMapper;

  constructor() {
    this.mapper = new WeightLogMapper();
  }

  async findMany(searchObj: any): Promise<WeightLog[]> {
    const log: WeightLogDoc[] = await WeightLogModel.find(searchObj).exec();
    if (log.length === 0) return [];
    return this.mapper.logsSchemaToDomainWeightLogs(log);
  }

  async findOne(id: string): Promise<WeightLog> {
    const response = await WeightLogModel.findOne({ _id: id }).exec();
    if (response !== null)
      return this.mapper.logSchemaToDomainWeightLog(response);
    return {} as WeightLog;
  }

  async save(body: WeightLog): Promise<WeightLog> {
    return this.mapper.logSchemaToDomainWeightLog(
      await new WeightLogModel(body).save()
    );
  }

  async update(id: string, body: WeightLog): Promise<WeightLog> {
    throw new Error();
  }

  async delete(id: string): Promise<number> {
    throw new Error();
  }
}
