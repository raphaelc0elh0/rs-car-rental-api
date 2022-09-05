import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/AppError"

export const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${error.message}`
  })
}