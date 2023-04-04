import { Request, Response, Router } from "express";
import { body, check, validationResult } from "express-validator";
import { ResponceStatus } from "../../types/responce-status";
import Log from "../../utils/log";
import DB from "../../storage/database";
import { User } from "../../../frontend/src/app/types/authSliceTypes";

const addUserRouter = Router()

addUserRouter.post(
    '',
    [
        body('user.name', 'bad user name')
            .trim()
            .isAlphanumeric()
            .isLength({ min: 2, max: 15 })
            .isString(),
        body('user.lastName', 'bad  lastname')
            .isLength({ max: 15 })
            .isString(),
        body('user._id', 'bad user id')
            .trim()
            .isString()
            .isAlphanumeric()
            .isLength({ min: 24, max: 24 }),

        body('user.avatar_url', 'bad avatar url')
            .trim()
            .isString(),
        body('user.avatar_min_url', 'bad avatar min url')
            .trim()
            .isString(),
        body('user.email', 'bad email')
            .trim()
            .isEmail(),
        body('user', 'bad user').isObject()
    ],
    async (req: Request, res: Response) => {
        const log = new Log('Route: /api/users/addUser')
        try {
            const errors = validationResult(req);
            ///// Validating request params
            if (!errors.isEmpty()) {
                return res.status(ResponceStatus.BadRequest).json({
                    message: "Incorect User",
                    predicate: "INCORRECT",
                    errors: errors.array(),
                });
            }

            const database = req.database
            const { user } = req.body as { user: User }

            //Make request to authentication service to register user

            const  resp = await fetch('https://auth.omgapp.pp.ua/register',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    email: "mihagfffaa@test.com",
                    password: "mihana1234",
                })
            }).then(response => response.json())
            .catch(err => log.error(`${err}`))
            for (const key in resp)  {
              log.info(key+':'+ resp[key])
            }

            //Check if user already exists
            const userExist = await database.getUser(user._id)
            if (userExist) {
                return res.status(ResponceStatus.StorageError).json({
                    message: 'User already exist',
                    predicate: 'EXIST'
                })
            }
            //Save user
            const _id = await database.addUser(user)
            log.info('User saved')
            return res.status(ResponceStatus.Success).json({
                _id
            })

        } catch (e: Error | any) {
            log.error(`Error ${e?.message}`);
            return res.status(ResponceStatus.ServerError).json({
                message: `Server error ${e?.message}`,
            });
        }

    }
)

export default addUserRouter
