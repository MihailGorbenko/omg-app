import config from "config";
import mongoose, { Types } from "mongoose";
import Log from "../utils/log";
import {User } from '../../frontend/src/app/types/authSliceTypes'
import UserModel from '../models/User'
import { UserRecord } from "../types/dbDocumentTypes";


export default abstract class DB {
    abstract connect():Promise<void>
    abstract close():Promise<void>
    abstract addUser(user:User):Promise<String>
    abstract getUser(userId:String):Promise<UserRecord>
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

    async addUser(user:User): Promise<String> {
        const savedUser = await new UserModel({
            _id: new Types.ObjectId(user._id.toString()),
            name:user.name,
            email: user.email,
            lastName:user.lastname ? user.lastname : '',
            avatar_url: user.avatar_url
        }).save()
        return savedUser.id
    }

    async getUser(userId:String):Promise<UserRecord>{
        const user = await UserModel.findById(userId)
        return user
    }
 
}

