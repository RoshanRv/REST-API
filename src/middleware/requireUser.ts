import { NextFunction, Request, Response } from "express"

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user

    if (!user) return res.sendStatus(403) //sends forbiddn error

    return next() //next() if user is authenticated
}

export default requireUser
