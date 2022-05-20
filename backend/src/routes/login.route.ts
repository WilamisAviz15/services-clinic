import jwt from "jsonwebtoken";
import * as express from "express";
import userDatabase from "../database/user.database";
import forbiddenError from "../database/errors/forbidden.error";
import { StatusCodes } from "http-status-codes";

const secret_token = process.env.TOKEN_SECRET;
const loginRoute = express.Router();

loginRoute.post("/", async (req, res) => {
  const user = await userDatabase.findByUsernameAndPassword(
    req.body.username,
    req.body.password
  );

  if (!user) {
    throw new forbiddenError("Usuário ou senha inválidos!");
  }

  const jwtPayload = { username: user.username };
  const jwtOptions = { subject: user?.uuid };

  const token = jwt.sign(jwtPayload, secret_token!, jwtOptions);
  res.header("authorization-token", token);
  res.status(StatusCodes.OK).json(token);
});

export default loginRoute;