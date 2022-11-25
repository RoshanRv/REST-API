import { Express, Request, Response } from "express"
import {
    deleteProductHandler,
    createProductHandler,
    getProductHandler,
    updateProductHandler,
    getProductsHandler,
    getProductsByMeHandler,
} from "@controller/product.contoller"
import {
    createSessionHandler,
    deleteSessionHandler,
    getSessionHandler,
} from "@controller/session.controller"
import {
    createUserHandler,
    getCurrentUserHandler,
} from "@controller/users.controller"

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

    // register user

    app.post(
        "/api/users",
        validateResource(createUserSchema),
        createUserHandler
    )

    // gets current using the access token that is passed through cookies

    app.get("/api/me", requireUser, getCurrentUserHandler)

    //log in

    app.post(
        "/api/sessions",
        validateResource(createSessionSchema),
        createSessionHandler
    )

    // fetch sessions

    app.get("/api/sessions", requireUser, getSessionHandler)

    // delete session (valid:false)

    app.delete("/api/sessions", requireUser, deleteSessionHandler)

    // fetch all products

    app.get("/api/products", getProductsHandler)

    // fetch my products (fetch by user id)
    app.get("/api/products/mine",requireUser ,getProductsByMeHandler)

    // fetch product by id

    app.get(
        "/api/products/:productId",
        [requireUser, validateResource(getProductSchema)],
        getProductHandler
    )

    // create product

    app.post(
        "/api/products",
        [requireUser, validateResource(createProductSchema)],
        createProductHandler
    )

    // update product

    app.put(
        "/api/products/:productId",
        [requireUser, validateResource(updateProductSchema)],
        updateProductHandler
    )

    // delete product

    app.delete(
        "/api/products/:productId",
        [requireUser, validateResource(deleteProductSchema)],
        deleteProductHandler
    )
}

export default routes
