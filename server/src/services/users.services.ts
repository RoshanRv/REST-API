import { omit } from "lodash"
import mongoose, {
    DocumentDefinition,
    FilterQuery,
    QueryOptions,
    UpdateQuery,
} from "mongoose"
import usersModel from "@models/users.model"
import UsersModel, { UserType } from "@models/users.model"
import axios from "axios"

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

    //.comparePassword is method created by me.. its defined is users.model
    const isValid = await user.comparePassword(password)

    if (!isValid) return false

    return omit(user.toJSON(), "password")
}

export const findUser = async (userId: string) => {
    return await usersModel.findById(userId).lean()
}

export interface GoogleUserProp {
    id: string
    email: string
    verified_email: boolean
    name: string
    given_name: string
    family_name: string
    picture: string
    locale: string
}

export const getGoogleUser = async ({
    id_token,
    access_token,
}: {
    id_token: string
    access_token: string
}): Promise<GoogleUserProp> => {
    try {
        const res = await axios.get<GoogleUserProp>(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        )
        return res.data
    } catch (e: any) {
        console.log(e)
        throw new Error(e)
    }
}

export const findAndUpdateUser = async (
    query: FilterQuery<UserType>,
    update: UpdateQuery<UserType>,
    options: QueryOptions = {}
) => {
    return UsersModel.findOneAndUpdate(query, update, options).lean()
}
