import { requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { Exercice, Repository } from '../core/entities';
import { ExerciceRepository } from '../infrastructure/repository';
import {
  CreateExerciceUseCase,
  RetriveAllCategoriesUseCase,
  RetriveAllExercicesUseCase,
  SearchExercicesUseCase,
} from '../core/usecases';

const router: Router = express.Router();
const exerciceRepository: Repository<Exercice> = new ExerciceRepository();

router.post(
  '/exercice',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Creating the exercice
      const usecase = new CreateExerciceUseCase(exerciceRepository);
      const createdExercice = (await usecase.execute(req.body))
        .data as Exercice[];

      res.status(201).send(createdExercice);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/categories',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Creating the exercice
      const usecase = new RetriveAllCategoriesUseCase();

      res.status(200).send((await usecase.execute()).data);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/exercices',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Creating the exercice
      const usecase = new RetriveAllExercicesUseCase(exerciceRepository);

      res.status(200).send((await usecase.execute()).data);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/exercices/:search',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Creating the exercice
      const usecase = new SearchExercicesUseCase(exerciceRepository);

      res.status(200).send((await usecase.execute(req.params.search)).data);
    } catch (error) {
      next(error);
    }
  }
);

export { router as exercices };
