import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { FaSignOutAlt } from "react-icons/fa"

export interface AuthProps {
    auth: boolean
    setAuth: (val: boolean) => void
}

const Header = ({ auth, setAuth }: AuthProps) => {
    const router = useRouter()

    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem("auth")!)
    //     console.log(data)
    //     if (data) return setAuth(true)
    //     return setAuth(false)
    // }, [auth])

    const handleLogout = () => {
        try {
            axios.delete(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
                { withCredentials: true }
            )
            setAuth(false)
            router.push("/auth/login")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <header>
            <nav className="px-6 py-6 bg-gradient-to-tr to-purple-300 from-purple-500 flex items-center justify-between shadow-xl ">
                <Link href={"/"}>
                    <h1 className="font-semibold text-3xl md:text-4xl text-white">
                        Products
                    </h1>
                </Link>
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
