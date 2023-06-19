import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppErros";

export function errorMiddleware(err: Error, request: Request, response: Response, next: NextFunction) {
    console.log('DEU ERRO')
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }
    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    })
}