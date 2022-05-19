import express from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import usersRoute from "./routes/user.route";

const app = express();

app.listen(3000, () => console.log("Running on port 3000"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/test", (req, res) => {
  res.status(201).send("ok");
});

app.use(usersRoute);

app.use(errorHandler);
