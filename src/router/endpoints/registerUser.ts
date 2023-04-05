import { Request, Response, Router } from "express";
import { body, check, validationResult } from "express-validator";
import { ResponceStatus } from "../../types/responce-status";
import Log from "../../utils/log";
import DB from "../../storage/database";
import { User } from "../../../frontend/src/app/types/authSliceTypes";
import config from 'config'

const registerUserRouter = Router()

registerUserRouter.post(
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
            .isString(),
        body('user.avatar_url', 'bad avatar url')
            .trim()
            .isString(),
        body('user.avatar_min_url', 'bad avatar min url')
            .trim()
            .isString(),
        body('user.email', 'bad email')
            .trim()
            .isEmail(),
        body('user', 'bad user')
            .isObject(),

        body('password', 'bad password')
            .trim()
            .isString()
            .isAlphanumeric()
            .isLength({ min: 5, max: 15 })
    ],
    async (req: Request, res: Response) => {
        const log = new Log('Route: /api/users/registerUser')
        try {
            const errors = validationResult(req);
            ///// Validating request params
            if (!errors.isEmpty()) {
                return res.status(ResponceStatus.BadRequest).json({
                    message: "Incorect User credentials",
                    predicate: "INCORRECT",
                    errors: errors.array(),
                });
            }

            const database = req.database
            const { user, password } = req.body as { user: User, password: string }


            //Make request to authentication service to register user
            let authResponse: globalThis.Response
            const authData = await fetch(config.get("register_url"), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.email,
                    password: password,
                })
            })
                .then(response => {
                    authResponse = response
                    return response.json()
                })
                .then(data => {
                    if (authResponse.status === 200) {
                        user._id = (data as { userId: string }).userId
                    }
                    else {
                        user._id = ""
                    }
                    return data
                })
                .catch(err => {
                    log.error(`Error ${err?.message}`);
                    return res.status(ResponceStatus.ServerError).json({
                        message: `Server error ${err?.message}`,
                    });
                })

            if (user._id.length < 24) {
                return res.status(authResponse!.status).json(authData)
            }

            log.info(`User id: ${user._id}`)

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

export default registerUserRouter
