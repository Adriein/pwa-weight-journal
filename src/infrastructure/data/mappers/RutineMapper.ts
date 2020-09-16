import { Rutine } from '../../../core/entities';
import { RutineDoc } from '../schemas';

export class RutineMapper {
  logSchemaToDomainRutine({
    _id,
    userId,
    name,
    creationDate,
  }: RutineDoc): Rutine {
    return { id: _id, userId, name, creationDate } as Rutine;
  }

  logsSchemaToDomainRutines(rutines: RutineDoc[]): Rutine[] {
    return rutines.map((rutine) => {
      return {
        id: rutine._id,
        rutineId: rutine.userId,
        logs: rutine.name,
        creationDate: rutine.creationDate,
      } as Rutine;
    });
  }
}
