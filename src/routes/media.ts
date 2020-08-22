import express, { Router } from 'express';
import path from 'path';
import fs from 'fs';

const router: Router = express.Router();
const dirPath = ['..', '..', 'src', 'static'];
const staticDir = fs.readdirSync(path.resolve(__dirname, ...dirPath));
const getImg = (param: string) => {
  return staticDir.find((imgName) => imgName.includes(param));
};


router.get('/static/:item', async (req, res) => {
  dirPath.push(getImg('arm')!);
  res.sendFile(
    path.resolve(__dirname, ...dirPath)
  );

  // if (req.params.item == '1') {
  //   res.sendFile(path.resolve(__dirname, '..','..', 'src', 'static', 'logo.png'));
  // }

  // if (req.params.id == '2') {
  //   res.sendFile(path.resolve(__dirname, '..','..', 'src', 'static', 'curri1.jpg'));
  // }

  // if (req.params.id == '3') {
  //   res.sendFile(path.resolve(__dirname, '..','..', 'src', 'static', 'home.jpg'));
  // }

  // if (req.params.id == '4') {
  //   res.sendFile(path.resolve(__dirname, '..','..', 'src', 'static', 'graph.jpg'));
  // }
});

export { router as media };
