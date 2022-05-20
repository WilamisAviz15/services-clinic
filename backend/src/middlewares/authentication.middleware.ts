import { NextFunction, Request, Response } from "express";
import forbiddenError from "../database/errors/forbidden.error";
import userDatabase from "../database/user.database";

async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      throw new forbiddenError("Credenciais não informadas");
    }

    const [authenticationType, token] = authorizationHeader.split(" ");

    if (authenticationType !== "Basic" || !token) {
      throw new forbiddenError("Tipo de authenticação inválida");
    }

    const tokenContent = Buffer.from(token, "base64").toString("utf-8");

    const [username, password] = tokenContent.split(":");

    if (!username || !password) {
      throw new forbiddenError("Credenciais não preenchidas");
    }

    const user = await userDatabase.findByUsernameAndPassword(
      username,
      password
    );

    if (!user) {
      throw new forbiddenError("Usuário ou senha inválidos!");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export default authenticationMiddleware;
