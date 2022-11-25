import { get } from "lodash"
import config from "config"
import { FilterQuery, UpdateQuery } from "mongoose"
import sessionModel, { SessionType } from "@models/session.model"
import { signJWT, verifyJWT } from "@utils/jwt.utils"
import { findUser } from "@services/users.services"

export const createSession = async (userId: string, userAgent: string) => {
    try {
        const session = await sessionModel.create({ user: userId, userAgent })
        return session
    } catch (err) {
        throw new Error("Something is Wrong, Try Again")
    }
}

export const findSessions = async (query: FilterQuery<SessionType>) => {
    return await sessionModel.find(query).lean()
}

export const updateSession = async (
    query: FilterQuery<SessionType>,
    update: UpdateQuery<SessionType>
) => {
    return await sessionModel.updateOne(query, update)
}

export const reIssueAccessToken = async ({
    refreshToken,
}: {
    refreshToken: string
}) => {
    const { decoded, expired } = verifyJWT(refreshToken, "PUBLIC_REFRESH_KEY")

    if (!decoded || !get(decoded, "session") || expired) return false

    const session = await sessionModel.findById(get(decoded, "session"))

    // to make sure that the session/user is not sign out

    if (!session || !session.valid) return false //returns false if session doesnt exit or session.valid is false (i.e) loggedout

    const user = await findUser(session.user)

    if (!user) return false

    const newAccessToken = signJWT(
        { ...user, session: session._id },
        "PRIVATE_ACCESS_KEY",
        { expiresIn: config.get<string>("accessTokenLife") }
    )

    return newAccessToken
}
