import mongoose, { DocumentDefinition } from "mongoose"
import UsersModel, { UserType } from "../models/users.model"

export const createUser = async (
    input: DocumentDefinition<
        Omit<UserType, "createdAt" | "updatedAt" | "comparePassword">
    >
) => {
    try {
        return await UsersModel.create(input)
    } catch (e: any) {
        throw new Error(e)
    }
}
