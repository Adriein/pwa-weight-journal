import express, { Router } from 'express';
import path from 'path';

const router: Router = express.Router();

router.get('/static/:id', async (req, res) => {
  if (req.params.id == '1') {
    res.sendFile(path.resolve(__dirname, '..','..', 'src', 'static', 'logo.png'));
  }

  if (req.params.id == '2') {
    res.sendFile(path.resolve(__dirname, '..','..', 'src', 'static', 'curri1.jpg'));
  }

  if (req.params.id == '3') {
    res.sendFile(path.resolve(__dirname, '..','..', 'src', 'static', 'home.jpg'));
  }

  if (req.params.id == '4') {
    res.sendFile(path.resolve(__dirname, '..','..', 'src', 'static', 'graph.jpg'));
  }
});

export { router as media };
