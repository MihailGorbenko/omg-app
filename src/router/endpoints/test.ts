import { Request, Response, Router } from "express";
import jwtAuth from "../../middleware/auth";
import { ResponceStatus } from "../../types/responce-status";


const testRouter = Router()

testRouter.post('',
    [
        jwtAuth()
    ],
    (req: Request, res: Response) => {
        return res
            .status(ResponceStatus.Success)
            .json({
                userId: req.userId
            })
            .send(`User id: ${req.userId}`)
    })

export default testRouter