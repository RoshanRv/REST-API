import { AnyZodObject } from "zod"
import { Request, Response, NextFunction } from "express"

//checks the input received from user , throws error if unexpected type or required value doesnt exits

const validate =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            })
            next()
        } catch (e: any) {
            return res.status(400).send(e.errors)
        }
    }

export default validate
