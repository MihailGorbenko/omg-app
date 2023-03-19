import { Express } from 'express'
import Log from './utils/log'
import config from 'config'
import http from 'http'
import createDatabase from './storage/createDatabase'
import createApp from './app'
import DB from './storage/database'

const log = new Log("Server")
const HTTP_PORT = config.get("http_port")

export function createHttpServer(app: Express): http.Server {
    return app.listen(HTTP_PORT, () => log.info(`HTTP server listeting on port ${HTTP_PORT}`))
}

export default async function start() {
    let db: DB | null = null
    try {
        db = await createDatabase()
        const app = createApp(db)
        createHttpServer(app)

    } catch (e: Error | any) {
        log.error(`Server error ${e}`)
        db?.close()
        process.exit(1)
    }
}