import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()

export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`Estas ejecutando en la ruta ${req.url} un método ${req.method}`);
        next()
    }
}

export function LoggerGlobal(req: Request, res: Response, next: NextFunction) {
    const currentDateTime = new Date();
    console.log(`Estas ejecutando en la ruta ${req.url} con un método ${req.method} llamado el: ${currentDateTime.toLocaleString()}`)
    next()
}