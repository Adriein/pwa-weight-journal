import { Rutine, Repository } from '../../core/entities';
import { RutineModel, RutineDoc } from '../data/schemas';
import { RutineMapper } from '../data/mappers/RutineMapper';
import { ExerciceRepository } from './ExerciceRepository';
import { Log } from '../../core/decorators';

export class RutineRepository implements Repository<Rutine> {
  private mapper: RutineMapper;

  constructor() {
    this.mapper = new RutineMapper();
  }

  async findMany(searchObj: any): Promise<Rutine[]> {
    const rutines: RutineDoc[] = await RutineModel.find(searchObj).exec();
    if (rutines.length === 0) return [];
    return this.mapper.rutinesSchemaToDomainRutines(rutines);
  }

  async findOne(id: string): Promise<Rutine> {
    const response = await RutineModel.findOne({
      _id: id,
    }).exec();
    if (response !== null)
      return this.mapper.rutineSchemaToDomainRutine(response);
    return {} as Rutine;
  }

  async save(body: Rutine): Promise<Rutine> {
    return this.mapper.rutineSchemaToDomainRutine(
      await new RutineModel(body).save()
    );
  }

  async update(id: string, body: Rutine): Promise<Rutine> {
    await RutineModel.updateOne({ _id: id }, body).exec();
    return await this.findOne(id);
  }

  async delete(id: string): Promise<number> {
    const deleted = (await RutineModel.deleteOne({ _id: id }).exec()).n;
    return deleted!;
  }
}
