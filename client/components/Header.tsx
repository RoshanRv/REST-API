import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { FaSignOutAlt } from "react-icons/fa"

const Header = () => {
    const router = useRouter()
    const [auth, setAuth] = useState<boolean>(false)

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("auth")!)
        if (data == "true") return setAuth(true)
        return setAuth(false)
    }, [])

    const handleLogout = () => {
        try {
            axios.delete(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
                { withCredentials: true }
            )
            router.push("/")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <header>
            <nav className="px-6 py-6 bg-gradient-to-tr to-purple-300 from-purple-500 flex items-center justify-between shadow-xl ">
                <h1 className="font-semibold text-3xl md:text-4xl text-white">
                    Products
                </h1>
                {auth && (
                    <button
                        onClick={handleLogout}
                        className="text-white text-2xl"
                    >
                        <FaSignOutAlt />
                    </button>
                )}
            </nav>
        </header>
    )
}

export default Header
