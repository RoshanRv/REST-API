import { Request, Response } from "express"
import {
    createProductType,
    deleteProductType,
    getProductType,
    updateProductType,
} from "../schema/product.schema"
import {
    createProduct,
    deleteProduct,
    findProduct,
    findProductAndUpdate,
} from "../services/product.services"

export const createProductHandler = async (
    req: Request<{}, {}, createProductType["body"]>,
    res: Response
) => {
    const userId = res.locals.user._id
    const body = req.body

    const product = await createProduct({ ...body, user: userId })

    return res.send(product)
}

export const getProductHandler = async (
    req: Request<getProductType["params"]>,
    res: Response
) => {
    const { productId } = req.params

    const product = await findProduct({ productId })

    if (!product) return res.sendStatus(404)

    return res.send(product)
}

export const updateProductHandler = async (
    req: Request<updateProductType["params"], {}, updateProductType["body"]>,
    res: Response
) => {
    const { productId } = req.params
    const userId = res.locals.user._id
    const update = req.body

    const product = await findProduct({ productId })

    if (!product) return res.sendStatus(404)

    if (String(product.user) !== userId) return res.sendStatus(403)

    const updateProduct = await findProductAndUpdate({ productId }, update, {
        new: true,
    })

    return res.send(updateProduct)
}

export const deleteProductHandler = async (
    req: Request<deleteProductType["params"]>,
    res: Response
) => {
    const { productId } = req.params
    const userId = res.locals.user._id

    const product = await findProduct({ productId })

    if (!product) return res.sendStatus(404)

    if (String(product.user) !== userId) return res.sendStatus(403)

    await deleteProduct({ productId })

    return res.sendStatus(200)
}
