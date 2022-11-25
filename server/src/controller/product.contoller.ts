import { Request, Response } from "express"
import {
    createProductType,
    deleteProductType,
    getProductType,
    updateProductType,
} from "@schema/product.schema"
import {
    createProduct,
    deleteProduct,
    findAllProducts,
    findProduct,
    findProductAndUpdate,
    findProducts,
} from "@services/product.services"

export const createProductHandler = async (
    req: Request<{}, {}, createProductType["body"]>,
    res: Response
) => {
    const userId = res.locals.user._id // stored during deserilaizedUser middleware and checked during requiredUser
    console.log(res.locals.user)
    const body = req.body

    const product = await createProduct({ ...body, user: userId })

    return res.send(product)
}

// One products by productID

export const getProductHandler = async (
    req: Request<getProductType["params"]>,
    res: Response
) => {
    const { productId } = req.params

    const product = await findProduct({ productId })

    if (!product) return res.sendStatus(404)

    return res.send(product)
}

// get my products (product by user id)
export const getProductsByMeHandler = async (eq: Request, res: Response) => {
    const userId = res.locals.user._id

    const products = await findProducts({ user: userId })

    return res.send(products)
}

// all products

export const getProductsHandler = async (req: Request, res: Response) => {
    let products

    products = await findAllProducts()

    // filterting products (shows other's products neglecting user's product)

    if (res.locals.user) {
        const userId = res.locals.user._id
        const filteredProducts = products.filter(
            (product) => product.user != userId
        )
        return res.send(filteredProducts)
    }

    return res.send(products)
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

    if (String(product.user) !== userId) return res.sendStatus(403) //typeof product.user = Object , typeof userId = string

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
