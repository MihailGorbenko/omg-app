import cookieParser from "cookie-parser";
import express, { Express } from "express";
import helmet from "helmet";
import path from "path";
import DB from "./storage/database";
import appRouter from './router/appRouter'
import attachDatabase from './middleware/attachDatabase'
import cors from 'cors'
import { SELF, expressCspHeader } from 'express-csp-header'


export default function createApp(db: DB): Express {
    const app = express()

    if (process.env.NODE_ENV !== 'production') {
        app.use(cors())
    }

    app.use(expressCspHeader({
        directives: {
            "default-src": [SELF, 'https://auth.omgapp.pp.ua','https://fonts.googleapis.com','https://fonts.gstatic.com'],
            "script-src": [SELF, 'https://auth.omgapp.pp.ua']
        }
    }))

    app.use(express.json())
    app.use(cookieParser())
    app.use(express.static(path.resolve(__dirname, '../public/build')))
    app.use('/api/storage', express.static(path.resolve(__dirname, 'userData')))
    app.use(attachDatabase(db))
    app.use('/', appRouter)
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'../public/build/index.html'))
    })
    return app
}



