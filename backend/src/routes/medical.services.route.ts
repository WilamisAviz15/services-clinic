import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import MedicalServicesDatabase from '../database/medical.services.database';

const medicalServicesRoute = Router();

medicalServicesRoute.get(
  '/medicalServices',
  async (req: Request, res: Response, next: NextFunction) => {
    const medicalServices =
      await MedicalServicesDatabase.findAllMedicalServices();
    res.status(StatusCodes.OK).send(medicalServices);
  }
);

medicalServicesRoute.post(
  '/medicalServices/medicalServicesByDate',
  async (req: Request, res: Response, next: NextFunction) => {
    const medicalServices =
      await MedicalServicesDatabase.findAllMedicalServicesByDate(req.body.date);
    res.status(StatusCodes.OK).send(medicalServices);
  }
);

medicalServicesRoute.post(
  '/medicalServices',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const newMedicalService = req.body;
    const uuid = await MedicalServicesDatabase.create(newMedicalService);
    res.status(StatusCodes.CREATED).send(uuid);
  }
);

medicalServicesRoute.put(
  '/medicalServices/:uuid',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifierMedicalService = req.body;

    modifierMedicalService.uuid = uuid;
    await MedicalServicesDatabase.update(modifierMedicalService);
    res.sendStatus(StatusCodes.OK);
  }
);

medicalServicesRoute.delete(
  '/medicalServices/:uuid',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await MedicalServicesDatabase.remove(uuid);
    res.sendStatus(StatusCodes.OK);
  }
);

export default medicalServicesRoute;
