import JWT, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { ResponceStatus } from '../types/responce-status'
import config from 'config'



export default function jwtAuth() {
    return function (req: Request, res: Response, next: NextFunction) {

        if(req.method === 'OPTIONS') return next()

        const token  = req.headers.authorization?.split(' ')[1] //Bearer TOKEN
        if (!token) {
            return res.status(ResponceStatus.BadRequest).json({
                message: 'Access token required'
            })
        }
        try {
            const decoded = JWT.verify(token, config.get('jwt_secret')) as { id: String }

            if (!decoded.id) {
                return res.status(ResponceStatus.BadRequest).json({
                    message: 'Access token missing userId',
                    predicate: 'BAD_TOKEN'
                })
            }

            req.userId = decoded.id

        } catch (err: VerifyErrors | any) {
            return res.status(ResponceStatus.NotAuthorized).json({
                message: 'Access token invalid or expired',
                predicate: 'EXPIRED'
            })
        }

        next()
    }
}



