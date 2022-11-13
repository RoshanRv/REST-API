import { object, string } from "zod"

export const createSessionSchema = object({
    body: object({
        email: string({ required_error: "Email is Required" }),
        password: string({ required_error: "Password is Required" }),
    }),
})
