import { useForm } from "react-hook-form"
import { object, string } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const UserSchema = object({
    username: string({
        required_error: "Username is Required",
    }).min(3, "Too Short!!"),
    password: string({
        required_error: "Password is Required",
    }).min(6, "Too Short!!!"),
    passwordConfirmation: string({
        required_error: "Confirm Password is Required",
    }),
    email: string({
        required_error: "Email is Required",
    }).email("Invalid Email"),
}).refine((data) => data.password == data.passwordConfirmation, {
    message: "Password Doesn't Match",
    path: ["passwordConfirmation"],
})

const login = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: zodResolver(UserSchema) })

    const onSubmit = (values: any) => {
        console.log(values)
    }

    console.log(errors)

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-10 rounded-lg shadow-lg shadow-purple-300 w-max flex flex-col gap-y-8"
            >
                <div className="relative ">
                    <input
                        required
                        type={"text"}
                        {...register("username")}
                        className=" p-1 border-b-2 focus:border-purple-700 border-black text-lg outline-0 peer placeholder:text-transparent bg-transparent w-80"
                        placeholder="name"
                    />
                    <label className="text-gray-400 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-purple-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Username
                    </label>
                    {errors.username && (
                        <p className="py-2 text-red-500">
                            {errors.username.message as string}
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

                <input
                    type={"submit"}
                    value="submit"
                    className="w-full py-2 text-white bg-purple-700 rounded-lg capitalize font-semibold cursor-pointer"
                />
            </form>
        </div>
    )
}

export default login
