

export { }

declare global {
  namespace Express {
    export interface Request {
      database: DB,
      userId: String

    }
  }
}