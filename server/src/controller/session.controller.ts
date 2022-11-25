import { Request, Response } from "express"
import { createSession, findSessions } from "@services/session.services"
import { validateUser } from "@services/users.services"
import { updateSession } from "@services/session.services"
import { signJWT } from "@utils/jwt.utils"
import config from "config"

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

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 3.154e10,
            domain: "localhost",
            sameSite: "strict",
            secure: false,
            path: "/",
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 3.154e10,
            domain: "localhost",
            sameSite: "strict",
            secure: false,
            path: "/",
        })

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

// sets valid = false for gn session
export const deleteSessionHandler = async (req: Request, res: Response) => {
    const sessionId = res.locals.user.session

    await updateSession({ _id: sessionId }, { valid: false })

    res.cookie("accessToken", null, {
        httpOnly: true,
        maxAge: 300,
        domain: "localhost",
        sameSite: "strict",
        secure: false,
        path: "/",
    })

    res.cookie("refreshToken", null, {
        httpOnly: true,
        maxAge: 300,
        domain: "localhost",
        sameSite: "strict",
        secure: false,
        path: "/",
    })

    return res.send({
        accessToken: null,
        refreshToken: null,
    })
}
