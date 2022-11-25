import type { NextPage } from "next"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Button, { LinkButton } from "../components/Button"
import ProductModal, { ProductInputProp } from "../components/ProductModal"
import ProductCard from "../components/ProductCard"
import fetcher from "../utils/fetcher"
import { AuthProps } from "../components/Header"

interface UserProps {
    _id: string
    email: string
    name: string
    createdAt: Date
    updatedAt: Date
    __v: number
    session: string
    iat: number
    exp: number
}

export interface ProductProp {
    _id: string
    createdAt: Date
    updatedAt: Date
    __v: number
    description: string
    image: string
    price: number
    productId: string
    title: string
    user: string
}

export interface ProductEditProp extends ProductInputProp {
    productId: string
}

const Home = ({ auth, setAuth }: AuthProps) => {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [modalData, setModalData] = useState({} as ProductEditProp)

    const { data } = useSWR<UserProps>(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
        fetcher
    )

    const { data: myProducts } = useSWR<ProductProp[]>(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/products/mine`,
        fetcher
    )

    const { data: products } = useSWR<ProductProp[]>(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/products`,
        fetcher
    )

    useEffect(() => {
        if (data) setAuth(true)
    }, [data])

    return (
        <>
            <main className="px-6 bg-gradient-to-br  from-sky-300 to-sky-500 pt-10 min-h-screen pb-10 ">
                {data && (
                    <h1 className="text-3xl font-semibold text-center">
                        Hi, {data.name}
                    </h1>
                )}
                {/*       My Products       */}
                <section>
                    <div className="flex justify-between mt-8 items-center">
                        <h1 className="lg:text-5xl text-3xl font-semibold text-purple-500 ">
                            My Products
                        </h1>
                        {/*   Create Or Login btn   */}
                        {data ? (
                            <div>
                                <Button
                                    text="Create"
                                    style="secondary"
                                    onClickHandler={() =>
                                        setShowCreateModal(true)
                                    }
                                />
                            </div>
                        ) : (
                            <div className="flex gap-x-6">
                                <LinkButton
                                    text="Sign In"
                                    style="primary"
                                    link={"/auth/register"}
                                />
                                <LinkButton
                                    text="Log In"
                                    style="secondary"
                                    link={"/auth/login"}
                                />
                            </div>
                        )}
                    </div>

                    <hr className="border border-purple-300 mb-8 mt-4 shadow-sm shadow-purple-300" />

                    {myProducts &&
                        (myProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myProducts.map((product, i) => (
                                    <ProductCard
                                        key={i}
                                        data={product}
                                        editable
                                        setModal={setShowEditModal}
                                        setModalData={setModalData}
                                    />
                                ))}
                            </div>
                        ) : (
                            <h1 className="text-2xl font-semibold m-2 text-center">
                                No Products Found
                            </h1>
                        ))}
                </section>
                {/*      Products    */}
                <section className="mt-32">
                    <h1 className="lg:text-5xl text-3xl font-semibold text-purple-500  mt-8">
                        Products
                    </h1>
                    <hr className="border border-purple-300 mb-8 mt-4 shadow-sm shadow-purple-300" />

                    {products &&
                        (products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product, i) => (
                                    <ProductCard key={i} data={product} />
                                ))}
                            </div>
                        ) : (
                            <h1 className="text-2xl font-semibold m-2 text-center">
                                No Products Found
                            </h1>
                        ))}
                </section>
            </main>
            {showCreateModal && <ProductModal showModal={setShowCreateModal} />}
            {showEditModal && (
                <ProductModal
                    showModal={setShowEditModal}
                    edit
                    data={modalData}
                />
            )}
        </>
    )
}

export default Home
