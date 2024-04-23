// module import
import express, { Request, Response } from 'express';
// middleware import
import checkBodyMiddleware from '../middleware/checkBody.middleware';
// interface import
import { addUserController } from '../../controller/user/addUser/addUser.controller.interface';

const router = express.Router();

// add a new user
router.post(
  '/',
  checkBodyMiddleware,
  (req: Request, res: Response): Promise<Response> => {
    // execute controller
    return addUserController.addUser(req, res);
  }
);

export default router;
