import { useForm } from "react-hook-form"
import { object, string, TypeOf } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"
import { AuthProps } from "../../components/Header"
import Button from "../../components/Button"
import getGoogleUrl from "../../utils/getGoogleUrl"

const UserSchema = object({
    password: string().min(6, "Too Short!!!"),
    email: string().email("Invalid Email").min(1, "Email Is Required"),
})

type UserInput = TypeOf<typeof UserSchema>

const login = ({ auth, setAuth }: AuthProps) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<UserInput>({ resolver: zodResolver(UserSchema) })

    const [loginError, setLoginError] = useState(null)

    const router = useRouter()

    const onSubmit = (values: UserInput) => {
        try {
            axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
                values,
                { withCredentials: true }
            )
            setAuth(true)
            router.push("/")
        } catch (e: any) {
            setLoginError(e.message)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br  from-sky-300 to-sky-500 ">
            <div className="bg-white p-10 rounded-lg shadow-lg shadow-purple-300 w-max flex flex-col gap-y-8">
                <div className="relative ">
                    <input
                        required
                        type={"email"}
                        {...register("email")}
                        className=" p-1 border-b-2 focus:border-purple-700 border-black text-lg outline-0 peer placeholder:text-transparent bg-transparent w-80"
                        placeholder="name"
                    />
                    <label className="text-gray-400 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-purple-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Email
                    </label>
                    {errors.email && (
                        <p className="py-2 text-red-500">
                            {errors.email.message as string}
                        </p>
                    )}
                </div>

                <div className="relative ">
                    <input
                        required
                        type={"password"}
                        {...register("password")}
                        className=" p-1 border-b-2 focus:border-purple-700 border-black text-lg outline-0 peer placeholder:text-transparent bg-transparent w-80"
                        placeholder="name"
                    />
                    <label className="text-gray-400 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-purple-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Password
                    </label>
                    {errors.password && (
                        <p className="py-2 text-red-500">
                            {errors.password.message as string}
                        </p>
                    )}
                </div>

                <button
                    onClick={handleSubmit(onSubmit)}
                    className="w-full py-2 text-white bg-purple-700 rounded-lg capitalize font-semibold cursor-pointer"
                >
                    Submit
                </button>

                <button className="w-full py-2 text-white bg-purple-700 rounded-lg capitalize font-semibold cursor-pointer">
                    <a href={getGoogleUrl()}>Login With Google</a>
                </button>
            </div>
        </div>
    )
}

export default login
