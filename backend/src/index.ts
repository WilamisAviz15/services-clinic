import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/error-handler.middleware';
import usersRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import loginRoute from './routes/login.route';
import medicalServicesRoute from './routes/medical.services.route';
import medicalAppointmentRoute from './routes/medical.appointment.route';
import doctorRoute from './routes/doctor.route';

const app = express();
const PORT = process.env.LOCAL_PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(loginRoute);
app.use(usersRoute);
app.use(medicalServicesRoute);
app.use(medicalAppointmentRoute);
app.use(doctorRoute);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
