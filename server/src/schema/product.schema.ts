import { number, object, string, TypeOf } from "zod"

const payload = {
    body: object({
        title: string({
            required_error: "Title is Required",
        }),
        description: string({
            required_error: "Description is Required",
        }).max(200, "Description Is Too Long"),
        price: number({
            required_error: "Price is Required",
        }),
        image: string({
            required_error: "Image is Required",
        }),
    }),
}

const params = {
    params: object({
        productId: string({
            required_error: "Product_Id is Required",
        }),
    }),
}

export const createProductSchema = object({ ...payload })
export const getProductSchema = object({ ...params })
export const updateProductSchema = object({ ...payload, ...params })
export const deleteProductSchema = object({ ...params })

export type createProductType = TypeOf<typeof createProductSchema>
export type getProductType = TypeOf<typeof getProductSchema>
export type updateProductType = TypeOf<typeof updateProductSchema>
export type deleteProductType = TypeOf<typeof deleteProductSchema>
