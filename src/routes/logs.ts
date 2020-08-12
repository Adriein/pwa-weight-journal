import { requireAuth, currentUser } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { Repository, WeightLog, Exercice } from '../core/entities';
import {
  WeightLogRepository,
  ExerciceRepository,
} from '../infrastructure/repository';
import {
  CreateWeightLogUseCase,
  RetriveAllLogsUseCase,
} from '../core/usecases';

const router: Router = express.Router();
const logsRepository: Repository<WeightLog> = new WeightLogRepository();
const exerciceRepository: Repository<Exercice> = new ExerciceRepository();

router.post(
  '/log',
  requireAuth,
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Creating the weight log
      const usecase = new CreateWeightLogUseCase(logsRepository);
      const createdLog = (
        await usecase.execute(
          Object.assign({}, { userId: req.currentUser!.id }, req.body)
        )
      ).data as WeightLog[];

      res.status(200).send(createdLog);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/logs',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new RetriveAllLogsUseCase(
        logsRepository,
        exerciceRepository
      );

      res.status(201).send((await usecase.execute()).data as WeightLog[]);
    } catch (error) {
      next(error);
    }
  }
);

export { router as logs };
