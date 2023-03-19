import { Database } from "./database";
import DB from "./database";


export default async function createDatabase(): Promise<DB> {
    const db = new Database()
    await db.connect()
    return db
}