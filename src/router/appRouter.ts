import { Router } from "express";
import testRouter from "./endpoints/test";



const appRouter = Router()

if (process.env.NODE_ENV === 'test') {
    appRouter.use('/test', testRouter)
}



export default appRouter