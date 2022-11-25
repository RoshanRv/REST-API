import {
    DocumentDefinition,
    FilterQuery,
    QueryOptions,
    UpdateQuery,
} from "mongoose"
import ProductModel, { ProductType } from "@models/product.model"

export const createProduct = async (
    input: DocumentDefinition<Omit<ProductType, "createdAt" | "updatedAt">>
) => {
    return await ProductModel.create(input)
}

export const findProduct = async (query: FilterQuery<ProductType>) => {
    return await ProductModel.findOne(query)
}

export const findProducts = async (query: FilterQuery<ProductType>) => {
    return await ProductModel.find(query)
}

export const findAllProducts = async () => {
    return await ProductModel.find()
}


export const findProductAndUpdate = async (
    query: FilterQuery<ProductType>,
    update: UpdateQuery<ProductType>,
    options: QueryOptions
) => {
    const updated = await ProductModel.findOneAndUpdate(query, update, options)
    console.log(update)
    return updated
}

export const deleteProduct = async (query: FilterQuery<ProductType>) => {
    return await ProductModel.deleteOne(query)
}
