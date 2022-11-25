import "../styles/globals.css"
import type { AppProps } from "next/app"
import Header from "../components/Header"
import { useState } from "react"

function MyApp({ Component, pageProps }: AppProps) {
    const [isAuth, setIsAuth] = useState(false)

    return (
        <>
            <Header auth={isAuth} setAuth={setIsAuth} />
            <Component {...pageProps} auth={isAuth} setAuth={setIsAuth} />
        </>
    )
}

export default MyApp
