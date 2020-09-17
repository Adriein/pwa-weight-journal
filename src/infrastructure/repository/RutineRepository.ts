import { Rutine, Repository } from '../../core/entities';
import { RutineModel, RutineDoc } from '../data/schemas';
import { RutineMapper } from '../data/mappers/RutineMapper';

export class RutineRepository implements Repository<Rutine> {
  private mapper: RutineMapper;

  constructor() {
    this.mapper = new RutineMapper();
  }

  async findMany(searchObj: any): Promise<Rutine[]> {
    const rutine: RutineDoc[] = await RutineModel.find(searchObj).exec();
    if (rutine.length === 0) return [];
    return this.mapper.rutinesSchemaToDomainRutines(rutine);
  }

  async findOne(id: string): Promise<Rutine> {
    const response = await RutineModel.findOne({
      name: id,
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
    throw new Error();
  }

  async delete(id: string): Promise<number> {
    throw new Error();
  }
}
