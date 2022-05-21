import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import medicalAppointmentDatabase from "../database/medical.appointment.database";

const medicalAppointmentRoute = Router();

medicalAppointmentRoute.get(
  "/medicalAppointment",
  async (req: Request, res: Response, next: NextFunction) => {
    const medicalAppointments =
      await medicalAppointmentDatabase.findAllMedicalAppointments();
    res.status(StatusCodes.OK).send(medicalAppointments);
  }
);

medicalAppointmentRoute.get(
  "/medicalAppointment/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      const userMedicalAppointments =
        await medicalAppointmentDatabase.findMedicalAppointmentsByUserId(uuid);
      res.status(StatusCodes.OK).send(userMedicalAppointments);
    } catch (error) {
      next(error);
    }
  }
);

medicalAppointmentRoute.post(
  "/medicalAppointment",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const newMedicalAppointment = req.body;
    const uuid = await medicalAppointmentDatabase.create(newMedicalAppointment);
    res.status(StatusCodes.CREATED).send(uuid);
  }
);

medicalAppointmentRoute.put(
  "/medicalAppointment/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifierMedicalAppointments = req.body;

    modifierMedicalAppointments.uuid = uuid;
    await medicalAppointmentDatabase.update(modifierMedicalAppointments);
    res.sendStatus(StatusCodes.OK);
  }
);

medicalAppointmentRoute.delete(
  "/medicalAppointment/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await medicalAppointmentDatabase.remove(uuid);
    res.sendStatus(StatusCodes.OK);
  }
);

export default medicalAppointmentRoute;
