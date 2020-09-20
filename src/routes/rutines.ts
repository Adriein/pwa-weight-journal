import { currentUser, requireAuth } from './middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { Rutine, Repository } from '../core/entities';
import { RutineRepository } from '../infrastructure/repository';
import {
  CreateRutineUseCase,
  RetriveAllRutinesUseCase,
} from '../core/usecases';

const router: Router = express.Router();
const rutineRepository: Repository<Rutine> = new RutineRepository();

router.get(
  '/rutines',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new RetriveAllRutinesUseCase(rutineRepository);

      res.status(200).send((await usecase.execute()).data);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/rutine',
  requireAuth,
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new CreateRutineUseCase(rutineRepository);
      req.body.userId = req.currentUser!.id;
      res.status(200).send((await usecase.execute(req.body)).data);
    } catch (error) {
      next(error);
    }
  }
);

export { router as rutines };
