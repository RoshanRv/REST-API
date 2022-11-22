import type { NextPage } from "next"
import useSWR from "swr"
import Button from "../components/Button"
import CreateModal from "../components/CreateModal"
import ProductCard from "../components/ProductCard"
import fetcher from "../utils/fetcher"

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

const Home: NextPage = () => {
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

    return (
        <>
            <main className="px-6 bg-gradient-to-br  from-sky-300 to-sky-500 pt-10">
                {data && (
                    <h1 className="text-3xl font-semibold text-center">
                        Hi, {data.name}
                    </h1>
                )}
                {/*       My Products       */}
                <section>
                    <div className="flex justify-between mt-8 items-center">
                        <h1 className="text-5xl font-semibold text-purple-500 ">
                            My Products
                        </h1>
                        {/*   Create Or Login btn   */}
                        {data ? (
                            <div>
                                <Button text="Create" style="secondary" />
                            </div>
                        ) : (
                            <div className="flex gap-x-6">
                                <Button text="Sign In" style="primary" />
                                <Button text="Log In" style="secondary" />
                            </div>
                        )}
                    </div>

                    <hr className="border border-purple-300 mb-8 mt-4 shadow-sm shadow-purple-300" />

                    {myProducts &&
                        (myProducts.length > 0 ? (
                            <div className="grid grid-cols-3 gap-6">
                                {myProducts.map((product, i) => (
                                    <ProductCard
                                        key={i}
                                        data={product}
                                        editable
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
                    <h1 className="text-5xl font-semibold text-purple-500  mt-8">
                        Products
                    </h1>
                    <hr className="border border-purple-300 mb-8 mt-4 shadow-sm shadow-purple-300" />

                    {products &&
                        (products.length > 0 ? (
                            <div className="grid grid-cols-3 gap-6">
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
            <CreateModal />
        </>
    )
}

export default Home
