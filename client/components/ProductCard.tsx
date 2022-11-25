import React from "react"
import { ProductEditProp, ProductProp } from "../pages"
import { FaEdit, FaTrash } from "react-icons/fa"
import axios from "axios"
import { useSWRConfig } from "swr"

interface ProductCardProps {
    data: ProductProp
    editable?: boolean
    setModal?: (val: boolean) => void
    setModalData?: (val: ProductEditProp) => void
}

const ProductCard = ({
    data,
    setModal,
    editable = false,
    setModalData,
}: ProductCardProps) => {
    const deleteProductHandler = async (id: string) => {
        const { mutate } = useSWRConfig()

        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/products/${id}`,
                { withCredentials: true }
            )
            mutate(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/products/mine`
            )
        } catch (e) {
            console.log(e)
        }
    }

    const handleEditModal = () => {
        if (setModal && setModalData) {
            setModal(true)
            const { title, description, image, price, productId } = data
            setModalData({ title, description, image, price, productId })
        }
    }

    return (
        <div className="p-3 group overflow-hidden relative rounded-lg shadow-lg shadow-purple-400 flex flex-col gap-y-4  w-[25rem] md:w-[35rem]   border-4 border-purple-400 bg-white">
            {/* editable  */}
            {editable && (
                <div className=" text-gray-700 text-xl group-hover:left-[2%] -left-full p-2 rounded-md transition-all bg-purple-300/80 absolute duration-300 flex flex-col gap-y-4">
                    <button
                        onClick={() => deleteProductHandler(data.productId)}
                    >
                        <FaTrash className="" />
                    </button>
                    <button onClick={handleEditModal}>
                        <FaEdit className="" />
                    </button>
                </div>
            )}

            <div className="max-h-[20rem]">
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
