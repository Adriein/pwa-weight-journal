import express, { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { NotFound } from '../core/errors/NotFound';

const router: Router = express.Router();
const dirPath = path.resolve(__dirname, '..', '..', 'src', 'static');

const getImg = (param: string, dir: string[]) => {
  return dir.find((imgName) => imgName.includes(param));
};

router.get('/static/:item', async (req, res) => {
  //Read dir with static imgs
  const staticDir = fs.readdirSync(dirPath);
  //Get the concrete img from the static dir
  const item = getImg(req.params.item, staticDir);

  if (item === undefined) throw new NotFound('Img not found');

  res.sendFile(path.resolve(dirPath, item));

});

export { router as media };
