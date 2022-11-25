import { Request, Response } from "express"
import { createUserInput } from "@schema/user.schema"
import { createUser } from "@services/users.services"
import { omit } from "lodash"

export const createUserHandler = async (
    req: Request<{}, {}, createUserInput["body"]>,
    res: Response
) => {
    try {
        const user = await createUser(req.body)
        return res.send(omit(user.toJSON(), "password"))

        // user.toJSON() or .lean() removes additional info about the data
        // @Eg: without .toJSON() or .lean()
        //
        // {...user} => {
        //     paths: [...],
        //     ...
        //     _doc:{
        //         _id:...
        //         name:...
        //     }
        // }

        // @Eg: with .toJSON or .lean()

        // {...user} => {
        //     _id:...,
        //     name:...
        // }
    } catch (e: any) {
        res.status(409).send(e.message)
    }
}

export const getCurrentUserHandler = async (req: Request, res: Response) => {
    return res.send(res.locals.user)
}
