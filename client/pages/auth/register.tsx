import { useForm } from "react-hook-form"
import { object, string, TypeOf } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"

const UserSchema = object({
    name: string().min(1, "Name Is Required"),
    password: string().min(6, "Too Short!!!"),
    passwordConfirmation: string().min(1, "Password Is Required"),
    email: string().email("Invalid Email").min(1, "Email Is Required"),
}).refine((data) => data.password == data.passwordConfirmation, {
    message: "Password Doesn't Match",
    path: ["passwordConfirmation"],
})

type UserInput = TypeOf<typeof UserSchema>

const register = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<UserInput>({ resolver: zodResolver(UserSchema) })

    const [registerError, setRegisterError] = useState(null)

    const router = useRouter()

    const onSubmit = (values: UserInput) => {
        try {
            axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
                values
            )
            router.push("/")
        } catch (e: any) {
            setRegisterError(e.message)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br  from-sky-300 to-sky-500 ">
            <form className="bg-white p-10 rounded-lg shadow-lg shadow-purple-300 w-max flex flex-col gap-y-8">
                <p className="text-red-600 py-2">{registerError}</p>

                <div className="relative ">
                    <input
                        required
                        type={"text"}
                        {...register("name")}
                        className=" p-1 border-b-2 focus:border-purple-700 border-black text-lg outline-0 peer placeholder:text-transparent bg-transparent w-80"
                        placeholder="name"
                    />
                    <label className="text-gray-400 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-purple-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Username
                    </label>
                    {errors.name && (
                        <p className="py-2 text-red-500">
                            {errors.name.message as string}
                        </p>
                    )}
                </div>

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

                <div className="relative ">
                    <input
                        required
                        type={"password"}
                        {...register("passwordConfirmation")}
                        className=" p-1 border-b-2 focus:border-purple-700 border-black text-lg outline-0 peer placeholder:text-transparent bg-transparent w-80"
                        placeholder="name"
                    />
                    <label className="text-gray-400 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-purple-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Confirm Password
                    </label>
                    {errors.passwordConfirmation && (
                        <p className="py-2 text-red-500">
                            {errors.passwordConfirmation.message as string}
                        </p>
                    )}
                </div>

                <button
                    onClick={handleSubmit(onSubmit)}
                    className="w-full py-2 text-white bg-purple-700 rounded-lg capitalize font-semibold cursor-pointer"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default register
