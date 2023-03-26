import { Request, Response, Router } from "express";
import { User } from "../../../frontend/src/app/types/authSliceTypes";
import jwtAuth from "../../middleware/auth";
import { ResponceStatus } from "../../types/responce-status";
import Log from "../../utils/log";




const getUserRouter = Router()

getUserRouter.get(
    '',
    [jwtAuth()],
    async (req: Request, res: Response) => {
        const log = new Log('Route: /api/users/getUser')
        try {
            const user = await req.database.getUser(req.userId)
            if (!user) {
                return res.status(ResponceStatus.NotAuthorized).json({
                    message: 'User not found',
                    predicate: 'NOT_EXIST'
                })
            }

            return res.status(ResponceStatus.Success).json({
                user: {
                    _id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    avatar_url: user.avatar_url
                }
            })

        } catch (e: Error | any) {
            log.error(`Error ${e?.message}`);
            return res.status(ResponceStatus.ServerError).json({
                message: `Server error ${e?.message}`,
            });
        }

    }
)

export default getUserRouter
