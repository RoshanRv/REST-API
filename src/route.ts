import { Express, Request, Response } from "express"
import {
    deleteProductHandler,
    createProductHandler,
    getProductHandler,
    updateProductHandler,
} from "@controller/product.contoller"
import {
    createSessionHandler,
    deleteSessionHandler,
    getSessionHandler,
} from "@controller/session.controller"
import { createUserHandler } from "@controller/users.controller"

import requireUser from "@middleware/requireUser"
import validateResource from "@middleware/validateResources"

import {
    createProductSchema,
    deleteProductSchema,
    getProductSchema,
    updateProductSchema,
} from "@schema/product.schema"
import { createSessionSchema } from "@schema/session.schema"
import { createUserSchema } from "@schema/user.schema"

const routes = (app: Express) => {
    //check server is alive or not
    app.get("/healthcheck", (req: Request, res: Response) =>
        res.sendStatus(200)
    )

    app.post(
        "/api/users",
        validateResource(createUserSchema),
        createUserHandler
    )

    app.post(
        "/api/sessions",
        validateResource(createSessionSchema),
        createSessionHandler
    )

    app.get("/api/sessions", requireUser, getSessionHandler)

    app.delete("/api/sessions", requireUser, deleteSessionHandler)

    app.get(
        "/api/products/:productId",
        [requireUser, validateResource(getProductSchema)],
        getProductHandler
    )
    app.post(
        "/api/products",
        [requireUser, validateResource(createProductSchema)],
        createProductHandler
    )
    app.put(
        "/api/products/:productId",
        [requireUser, validateResource(updateProductSchema)],
        updateProductHandler
    )
    app.delete(
        "/api/products/:productId",
        [requireUser, validateResource(deleteProductSchema)],
        deleteProductHandler
    )
}

export default routes
