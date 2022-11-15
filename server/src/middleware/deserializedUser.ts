import { NextFunction, Request, Response } from "express"
import { get } from "lodash"
import { reIssueAccessToken } from "@services/session.services"
import { verifyJWT } from "@utils/jwt.utils"

const deserializedUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = req.headers.authorization?.split(" ")[1] //[Bearer, <accessToken>]
    const refreshToken = get(req, "headers.x-refresh")

    if (!accessToken) return next()

    const { decoded, expired } = verifyJWT(accessToken, "PUBLIC_ACCESS_KEY")

    //if access token is valid, next()
    if (decoded) {
        res.locals.user = decoded
        return next()
    }

    //res.locals.user = undefined if accesstoken is valid...

    if (expired && refreshToken && typeof refreshToken == "string") {
        const newAccessToken = await reIssueAccessToken({ refreshToken })

        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken)
        }

        const result = verifyJWT(newAccessToken as string, "PUBLIC_ACCESS_KEY")

        res.locals.user = result.decoded //updating the users details (undefined => user details)

        return next()
    }

    return next()
}

export default deserializedUser