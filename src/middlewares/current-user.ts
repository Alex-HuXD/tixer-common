import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

type UserPayload = {
    id: string
    email: string
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload | null
        }
    }
}

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        req.currentUser = null
        return next()
    }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
        req.currentUser = payload
    } catch (err) {}

    next()
}
