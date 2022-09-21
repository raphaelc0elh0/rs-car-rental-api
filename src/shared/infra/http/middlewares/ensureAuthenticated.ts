import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "../../../../config/authConfig";
import { PostgresUserTokensRepository } from "../../../../modules/accounts/infra/typeorm/repositories/implementations/PostgresUserTokensRepository";
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
      authConfig.secret_refresh_token
    ) as IPayload;

    const userTokensRepository = new PostgresUserTokensRepository();

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );
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
