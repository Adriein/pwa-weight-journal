import { requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { Repository, WeightLog } from '../core/entities';
import { WeightLogRepository } from '../infrastructure/repository';
import { CreateWeightLogUseCase } from '../core/usecases';

const router: Router = express.Router();
const logsRepository: Repository<WeightLog> = new WeightLogRepository();

router.post(
  '/log',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Creating the weight log
      const usecase = new CreateWeightLogUseCase(logsRepository);
      const createdLog = (await usecase.execute(req.body))
        .data as WeightLog[];

      res.status(201).send(createdLog);
    } catch (error) {
      next(error);
    }
  }
);

export { router as logs };
