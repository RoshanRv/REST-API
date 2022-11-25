import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { number, object, string } from "zod"
import { ProductEditProp, ProductProp } from "../pages"
import Button from "./Button"
import { GrClose } from "react-icons/gr"
import axios from "axios"
import { useSWRConfig } from "swr"

const ProductInputSchema = object({
    title: string().min(1, "Title Is Required"),
    description: string().min(1, "Description Is Required"),
    image: string().min(1, "Image URL Is Required"),
    price: string().min(1, "Price Is Required"),
})

export type ProductInputProp = Pick<
    ProductProp,
    "description" | "price" | "image" | "title"
>

interface ModalProps {
    showModal: (val: boolean) => void
    data?: ProductEditProp
    edit?: boolean
}

const CreateModal = ({ showModal, data, edit = false }: ModalProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProductInputProp>({ resolver: zodResolver(ProductInputSchema) })

    const { mutate } = useSWRConfig()

    useEffect(() => {
        if (edit && data) {
            const { description, image, title, price } = data
            setValue("title", title)
            setValue("image", image)
            setValue("price", price)
            setValue("description", description)
        }
    }, [])

    const onSubmit = async (values: ProductInputProp) => {
        try {
            if (edit) {
                await axios.put(
                    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/products/${data?.productId}`,
                    { ...values, price: Number(values.price) },
                    {
                        withCredentials: true,
                    }
                )
            } else {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/products`,
                    { ...values, price: Number(values.price) },
                    {
                        withCredentials: true,
                    }
                )
            }

            showModal(false)
            mutate(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/products/mine`
            )
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="fixed top-0 left-0 bg-black/50 w-full h-full flex justify-center items-center z-50">
            <div className="bg-white p-10 pt-4 rounded-lg shadow-lg shadow-purple-300 sm:w-max w-full  border-2 border-purple-500 relative">
                {/*    Close Btn      */}
                <button
                    className="absolute top-5 right-5 text-xl"
                    onClick={() => showModal(false)}
                >
                    <GrClose />
                </button>

                {/* Title */}
                <h1 className="mb-8 text-3xl font-semibold text-purple-500 text-center">
                    {edit ? "Edit Details" : "Create Product"}
                </h1>

                <div className="mt-6 flex flex-col gap-y-8  ">
                    <div className="relative ">
                        <input
                            type={"text"}
                            {...register("title")}
                            className=" p-1 border-b-2 focus:border-purple-700 border-black text-lg outline-0 peer placeholder:text-transparent bg-transparent  w-full sm:w-80"
                            placeholder="title"
                        />
                        <label className="text-gray-400 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-purple-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                            Title
                        </label>
                        {errors.title && (
                            <p className="py-2 text-red-500">
                                {errors.title.message as string}
                            </p>
                        )}
                    </div>

                    <div className="relative ">
                        <input
                            type={"text"}
                            {...register("price")}
                            className=" p-1 border-b-2 focus:border-purple-700 border-black text-lg outline-0 peer placeholder:text-transparent bg-transparent  w-full sm:w-80"
                            placeholder="price"
                        />
                        <label className="text-gray-400 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-purple-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                            Price
                        </label>
                        {errors.price && (
                            <p className="py-2 text-red-500">
                                {errors.price.message as string}
                            </p>
                        )}
                    </div>

                    <div className="relative ">
                        <textarea
                            {...register("description")}
                            className=" p-1 border-b-2 focus:border-purple-700 border-black text-lg outline-0 peer placeholder:text-transparent bg-transparent  w-full sm:w-80"
                            placeholder="description"
                        />
                        <label className="text-gray-400 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-purple-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                            Description
                        </label>
                        {errors.description && (
                            <p className="py-2 text-red-500">
                                {errors.description.message as string}
                            </p>
                        )}
                    </div>

                    <div className="relative ">
                        <input
                            type={"text"}
                            {...register("image")}
                            className=" p-1 border-b-2 focus:border-purple-700 border-black text-lg outline-0 peer placeholder:text-transparent bg-transparent  w-full sm:w-80"
                            placeholder="image"
                        />
                        <label className="text-gray-400 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-purple-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                            Image URL
                        </label>
                        {errors.image && (
                            <p className="py-2 text-red-500">
                                {errors.image.message as string}
                            </p>
                        )}
                    </div>

                    <Button
                        style="primary"
                        text="Submit"
                        onClickHandler={handleSubmit(onSubmit)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateModal
