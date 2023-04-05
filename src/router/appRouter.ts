import { Router } from "express";
import jwtAuth from "../middleware/auth";
import registerUserRouter from "./endpoints/registerUser";
import getUserRouter from "./endpoints/getUser";
import testRouter from "./endpoints/test";



const appRouter = Router()

if (process.env.NODE_ENV === 'test') {
    appRouter.use('/test', testRouter)
}
appRouter.use('/api/users/registerUser',registerUserRouter)
appRouter.use('/api/users/getUser',getUserRouter)



export default appRouter