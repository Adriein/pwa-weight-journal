import { Rutine } from '../../../core/entities';
import { RutineDoc } from '../schemas';

export class RutineMapper {
  rutineSchemaToDomainRutine({
    _id,
    userId,
    name,
    description,
    exercices,
    updatedAt,
  }: RutineDoc): Rutine {
    return {
      id: _id,
      userId,
      name,
      description,
      exercices,
      creationDate: updatedAt,
    } as Rutine;
  }

  rutinesSchemaToDomainRutines(rutines: RutineDoc[]): Rutine[] {
    return rutines.map((rutine) => {
      return {
        id: rutine._id,
        rutineId: rutine.userId,
        name: rutine.name,
        description: rutine.description,
        exercices: rutine.exercices,
        creationDate: rutine.updatedAt,
      } as Rutine;
    });
  }
}
