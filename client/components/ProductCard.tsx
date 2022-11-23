import React from "react"
import { ProductProp } from "../pages"
import { FaEdit, FaTrash, FaUserEdit } from "react-icons/fa"
import axios from "axios"

interface ProductCardProps {
    data: ProductProp
    editable?: boolean
}

const deleteProductHandler = (id: string) => {
    try {
        console.log(id)
        axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/products/${id}`,
            { withCredentials: true }
        )
    } catch (e) {
        console.log(e)
    }
}

const ProductCard = ({ data, editable = false }: ProductCardProps) => {
    return (
        <div className="p-3 group overflow-hidden relative rounded-lg shadow-lg shadow-purple-400 flex flex-col gap-y-4  w-[25rem] md:w-[35rem] border-4 border-purple-400 bg-white">
            {/* editable  */}
            {editable && (
                <div className=" text-gray-700 text-xl group-hover:left-[2%] -left-full p-2 rounded-md transition-all bg-purple-300/80 absolute duration-300 flex flex-col gap-y-4">
                    <button
                        onClick={() => deleteProductHandler(data.productId)}
                    >
                        <FaTrash className="" />
                    </button>
                    <button>
                        <FaEdit className="" />
                    </button>
                </div>
            )}

            <div className="">
                <img
                    src={data.image}
                    alt=""
                    className="w-full h-full"
                    draggable={false}
                />
            </div>
            <hr className="border border-purple-300 mt-4 shadow-sm shadow-purple-300" />
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">{data.title}</h1>
                <h1 className="text-3xl font-semibold">{"₹ " + data.price}</h1>
            </div>
            <h1 className="text-xl">{data.description}</h1>
        </div>
    )
}

export default ProductCard
