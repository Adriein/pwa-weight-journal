import { Exercice } from '../../../core/entities';
import { ExerciceDoc } from '../schemas';

export class ExerciceMapper {
  exerciceSchemaToDomainExercice({ _id, name, category }: ExerciceDoc): Exercice {
    return { id: _id, name, category } as Exercice;
  }

  exercicesSchemaToDomainExercices(exercices: ExerciceDoc[]): Exercice[] {
    return exercices.map((exercice) => {
      return {
        id: exercice._id,
        name: exercice.name,
        category: exercice.category,
      } as Exercice;
    });
  }
}
