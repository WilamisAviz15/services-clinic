import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import userDatabase from '../database/user.database';

const usersRoute = Router();

usersRoute.get(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userDatabase.findAllUsers();
    res.status(StatusCodes.OK).send(users);
  }
);

usersRoute.get(
  '/users/:uuid',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      const user = await userDatabase.findUserById(uuid);
      res.status(StatusCodes.OK).send(user);
    } catch (error) {
      next(error);
    }
  }
);

usersRoute.post(
  '/users',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const newUser = req.body.user;
    const uuid = await userDatabase.create(newUser);
    res.status(StatusCodes.CREATED).json({
      message: 'Usuário cadastrado com sucesso! Agora faça seu login',
    });
  }
);

usersRoute.put(
  '/users/:uuid',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifierUser = req.body.user;
    modifierUser.uuid = uuid;
    await userDatabase.update(modifierUser);
    res
      .status(StatusCodes.OK)
      .json({ message: 'Perfil atualizado com sucesso!' });
  }
);

usersRoute.delete(
  '/users/:uuid',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await userDatabase.remove(uuid);
    res.sendStatus(StatusCodes.OK);
  }
);

export default usersRoute;
