import { Exercice, Repository } from '../../core/entities';
import { ExerciceModel, ExerciceDoc } from '../data/schemas';
import { ExerciceMapper } from '../data/mappers/ExerciceMapper';

export class ExerciceRepository implements Repository<Exercice> {
  private mapper: ExerciceMapper;

  constructor() {
    this.mapper = new ExerciceMapper();
  }

  async findMany(searchObj: any): Promise<Exercice[]> {
    const exercice: ExerciceDoc[] = await ExerciceModel.find(searchObj).exec();
    if (exercice.length === 0) return [];
    return this.mapper.exercicesSchemaToDomainExercices(exercice);
  }

  async findOne(id: string): Promise<Exercice> {
    const response = await ExerciceModel.findOne({
      name: id,
    }).exec();
    if (response !== null)
      return this.mapper.exerciceSchemaToDomainExercice(response);
    return {} as Exercice;
  }

  async save(body: Exercice): Promise<Exercice> {
    return this.mapper.exerciceSchemaToDomainExercice(
      await new ExerciceModel(body).save()
    );
  }

  async update(id: string, body: Exercice): Promise<Exercice> {
    throw new Error();
  }

  async delete(id: string): Promise<number> {
    throw new Error();
  }
}
