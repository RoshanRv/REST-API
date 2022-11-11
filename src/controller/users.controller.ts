import { Request, Response } from "express"
import { createUserInput } from "../schema/user.schema"
import { createUser } from "../services/users.services"
import { omit } from "lodash"

export const createUserHandler = async (
    req: Request<{}, {}, createUserInput["body"]>,
    res: Response
) => {
    try {
        const user = await createUser(req.body)
        return res.send(omit(user.toJSON(), "password"))
    } catch (e: any) {
        res.status(409).send(e.message)
    }
}
