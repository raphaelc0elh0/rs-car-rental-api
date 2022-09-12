import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { PostgresUsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/implementations/PostgresUsersRepository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const { sub: user_id } = verify(
      token,
      "80ba3295fca2cd4d4300d4214706b268"
    ) as IPayload;

    const usersRepository = new PostgresUsersRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("User not found", 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
};
