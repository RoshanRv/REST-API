import jwt from "jsonwebtoken"

export const signJWT = (
    object: Object, // payload
    keyName: "PRIVATE_ACCESS_KEY" | "PRIVATE_REFRESH_KEY",
    options?: jwt.SignOptions | undefined
) => {
    try {
        const signingKey = (
            keyName == "PRIVATE_ACCESS_KEY"
                ? process.env.PRIVATE_ACCESS_KEY
                : process.env.PRIVATE_REFRESH_KEY
        ).replace(/\\n/g, "\n")

        return jwt.sign(object, signingKey, {
            ...(options && options),
            algorithm: "RS256",
        })
    } catch (e: any) {
        console.log(e)
        throw new Error("Error Signing Token")
    }
}

export const verifyJWT = (
    token: string,
    keyName: "PUBLIC_ACCESS_KEY" | "PUBLIC_REFRESH_KEY"
) => {
    try {
        const publicKey = (
            keyName == "PUBLIC_ACCESS_KEY"
                ? process.env.PUBLIC_ACCESS_KEY
                : process.env.PUBLIC_REFRESH_KEY
        ).replace(/\\n/g, "\n")

        const decoded = jwt.verify(token, publicKey)

        return {
            valid: true,
            expired: false,
            decoded,
        }
    } catch (e: any) {
        console.error(e)

        return {
            valid: false,
            expired: e.message == "jwt expired",
            decoded: null,
        }
    }
}
