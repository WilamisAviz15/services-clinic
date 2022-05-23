import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import doctorDatabase from '../database/doctor.database';

const doctorRoute = Router();

doctorRoute.get(
  '/doctors',
  async (req: Request, res: Response, next: NextFunction) => {
    const doctors = await doctorDatabase.findAllDoctors();
    res.status(StatusCodes.OK).send(doctors);
  }
);

doctorRoute.get(
  '/doctors/:uuid',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      const doctor = await doctorDatabase.findDoctorById(uuid);
      res.status(StatusCodes.OK).send(doctor);
    } catch (error) {
      next(error);
    }
  }
);

doctorRoute.post(
  '/doctors',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const newDoctor = req.body;
    const uuid = await doctorDatabase.create(newDoctor);
    res.status(StatusCodes.CREATED).send(uuid);
  }
);

doctorRoute.put(
  '/doctors/:uuid',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifierDoctor = req.body;
    modifierDoctor.uuid = uuid;
    await doctorDatabase.update(modifierDoctor);
    res.sendStatus(StatusCodes.OK);
  }
);

doctorRoute.put(
  '/doctors/valueToReceive/:uuid',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      const modifierDoctor = req.body;
      modifierDoctor.uuid = uuid;
      await doctorDatabase.updateValueToReceive(modifierDoctor);
      res.status(StatusCodes.OK).json('Comissão atualizada!');
    } catch (error) {
      next(error);
    }
  }
);

doctorRoute.delete(
  '/doctors/:uuid',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await doctorDatabase.remove(uuid);
    res.sendStatus(StatusCodes.OK);
  }
);

export default doctorRoute;
