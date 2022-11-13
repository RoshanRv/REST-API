import { omit } from "lodash"
import mongoose, { DocumentDefinition } from "mongoose"
import usersModel from "../models/users.model"
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

export const validateUser = async ({
    email,
    password,
}: {
    email: string
    password: string
}) => {
    const user = await UsersModel.findOne({ email })

    if (!user) return false

    const isValid = await user.comparePassword(password)

    if (!isValid) return false

    return omit(user.toJSON(), "password")
}

export const findUser = async (userId: string) => {
    return await usersModel.findById(userId)
}
