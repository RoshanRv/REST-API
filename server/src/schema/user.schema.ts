import { object, string, TypeOf } from "zod"

export const createUserSchema = object({
    body: object({
        name: string({ required_error: "Name is Required" }),
        password: string({ required_error: "Password is Required" }).min(
            6,
            "Password is too short"
        ),
        passwordConfirmation: string({
            required_error: "Password Confirmation is Required",
        }),
        email: string({
            required_error: "Email is Required",
        }).email("Invalid Email"),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password Do Not Match",
        path: ["passwordConfirmation"],
    }),
})

export type createUserInput = Omit<
    TypeOf<typeof createUserSchema>,
    "body.passwordConfirmation"
>
