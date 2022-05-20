import express from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import usersRoute from "./routes/user.route";
import authRoute from "./routes/authorization.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/test", (req, res) => {
  res.status(201).send("ok");
});

app.use(usersRoute);
app.use(authRoute);

app.use(errorHandler);

app.listen(3000, () => console.log("Running on port 3000"));
