import { CookieOptions, Request, Response } from "express"
import {
    createSession,
    findSessions,
    getGoogleOauthTokens,
} from "@services/session.services"
import {
    findAndUpdateUser,
    getGoogleUser,
    validateUser,
} from "@services/users.services"
import { updateSession } from "@services/session.services"
import { signJWT } from "@utils/jwt.utils"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "config"

const accessTokenOptions: CookieOptions = {
    httpOnly: true,
    maxAge: 900000,
    sameSite: "none",
    secure: true,
    path: "/",
}

const refreshTokenOptions = { ...accessTokenOptions, maxAge: 3.154e10 }

export const createSessionHandler = async (req: Request, res: Response) => {
    try {
        //  validates users password
        const user = await validateUser(req.body)

        if (!user) return res.status(401).send("Invalid Email or Password")

        // creates a session

        //The User-Agent request header is a characteristic string that lets servers and network peers identify the application, operating system, vendor, and/or version of the requesting user agent. Eg: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36

        const session = await createSession(
            user._id,
            req.get("user-agent") || ""
        )

        //generate a access token
        const accessToken = signJWT(
            { ...user, session: session._id },
            "PRIVATE_ACCESS_KEY",
            { expiresIn: config.get<string>("accessTokenLife") }
        )

        //generate a refresh token
        const refreshToken = signJWT(
            { ...user, session: session._id },
            "PRIVATE_REFRESH_KEY",
            { expiresIn: config.get<string>("refreshTokenLife") }
        )

        res.cookie("accessToken", accessToken, accessTokenOptions)

        res.cookie("refreshToken", refreshToken, refreshTokenOptions)

        res.send({ accessToken, refreshToken })
    } catch (e: any) {
        return res.send(e.message)
    }
}

export const getSessionHandler = async (req: Request, res: Response) => {
    const userId = res.locals.user._id

    const sessions = await findSessions({ user: userId, valid: true })

    return res.send(sessions)
}

// sets valid = false for given session
export const deleteSessionHandler = async (req: Request, res: Response) => {
    const sessionId = res.locals.user.session

    await updateSession({ _id: sessionId }, { valid: false })

    res.cookie("accessToken", null, {
        httpOnly: true,
        maxAge: 900000,
        sameSite: "none",
        secure: true,
        path: "/",
    })

    res.cookie("refreshToken", null, {
        httpOnly: true,
        maxAge: 3.154e10,
        sameSite: "none",
        secure: true,
        path: "/",
    })

    return res.send({
        accessToken: null,
        refreshToken: null,
    })
}

export const googleAuthHandler = async (req: Request, res: Response) => {
    try {
        //get code from query
        const code = req.query.code as string

        // get id and access token using code
        const { access_token, id_token } = await getGoogleOauthTokens({ code })

        console.log({ access_token, id_token })

        // get user from id_token
        const googleUser = await getGoogleUser({ access_token, id_token })
        //const decoded  = jwt.decode(id_token)

        if (!googleUser.verified_email)
            return res.status(403).send("Email Is Not Verified")

        // upsert the user

        const user = await findAndUpdateUser(
            { email: googleUser.email },
            { email: googleUser.email, name: googleUser.name },
            { new: true, upsert: true }
        )

        if (!user) return res.status(404).send("User Not Found")

        // create session

        const session = await createSession(
            user._id,
            req.get("user-agent") || ""
        )

        //generate a access token
        const accessToken = signJWT(
            { ...user, session: session._id },
            "PRIVATE_ACCESS_KEY",
            { expiresIn: config.get<string>("accessTokenLife") }
        )

        //generate a refresh token
        const refreshToken = signJWT(
            { ...user, session: session._id },
            "PRIVATE_REFRESH_KEY",
            { expiresIn: config.get<string>("refreshTokenLife") }
        )

        res.cookie("accessToken", accessToken, accessTokenOptions)

        res.cookie("refreshToken", refreshToken, refreshTokenOptions)

        return res.redirect(`${config.get("origin")}`)
    } catch (e: any) {
        console.log(e)
        console.log(e.message)
        return res.redirect(`${config.get("origin")}/auth/login`)
    }
}
