import { NextFunction, Request, Response } from "express";

import { PostgresUsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/implementations/PostgresUsersRepository";
import { AppError } from "../../../errors/AppError";

export const ensureAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.user;

  const usersRepository = new PostgresUsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User is not admin");
  }

  return next();
};
