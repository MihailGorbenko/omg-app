import cookieParser from "cookie-parser";
import express, { Express } from "express";
import helmet from "helmet";
import path from "path";
import DB from "./storage/database";
import appRouter from './router/appRouter'
import attachDatabase from './middleware/attachDatabase'
import cors from 'cors'


export default function createApp(db: DB): Express {
    const app = express()

    if (process.env.NODE_ENV !== 'production') {
        app.use(cors())
    }
    else { app.use(helmet()) }

    app.use(express.json())
    app.use(cookieParser())
    app.use(express.static(path.resolve(__dirname, '../frontend/build')))
    app.use('/api/storage', express.static(path.resolve(__dirname, 'userData')))
    app.use(attachDatabase(db))
    app.use('/', appRouter)
    app.get('/:universalURL', (req, res) => {
        res.send('404 URL NOT FOUND')
    })
    return app
}



