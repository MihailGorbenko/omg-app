import config from "config";
import mongoose from "mongoose";
import Log from "../utils/log";


export default abstract class DB {
    abstract connect():Promise<void>
    abstract close():Promise<void>
}

export class Database extends DB {
    connection: mongoose.Connection | null

    constructor(){
        super()
        this.connection = null
    }

    async connect(): Promise<void> {
        const log = new Log("Database")

        mongoose.set('strictQuery', false)
        mongoose.connection.on('error', (err) => log.error(err))
        mongoose.connection.once('open', () => log.info('Mongo DB connection successfull'))
        this.connection = mongoose.connection
        await mongoose.connect(config.get('mongo_uri'))
    }

    async close(): Promise<void> {
        if(this.connection){
            await this.connection.close()
            this.connection = null
        }
    }
 
}

