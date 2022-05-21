import express from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import usersRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";
import loginRoute from "./routes/login.route";
import medicalServicesRoute from "./routes/medical.services.route";
import medicalAppointmentRoute from "./routes/medical.appointment.route";
import doctorRoute from "./routes/doctor.route";

const app = express();
const PORT = process.env.LOCAL_PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loginRoute);
app.use(authRoute, usersRoute);
app.use(authRoute, medicalServicesRoute);
app.use(authRoute, medicalAppointmentRoute);
app.use(authRoute, doctorRoute);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
