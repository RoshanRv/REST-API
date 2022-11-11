import { Express, Request, Response } from "express"
import { createUserHandler } from "./controller/users.controller"
import validateResource from "./middleware/validateResources"
import { createUserSchema } from "./schema/user.schema"

const routes = (app: Express) => {
    app.get("/healthcheck", (req: Request, res: Response) =>
        res.sendStatus(200)
    )

    app.post(
        "/api/users",
        validateResource(createUserSchema),
        createUserHandler
    )
}

export default routes
