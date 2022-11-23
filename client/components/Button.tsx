import React from "react"

interface ButtonProps {
    text: string
    style: "primary" | "secondary"
    full?: boolean
    large?: boolean
    onClickHandler?: any
}

const Button = ({
    text,
    style,
    full = false,
    onClickHandler,
    large = false,
}: ButtonProps) => {
    return (
        <button
            className={`py-2 px-8 rounded-lg capitalize font-semibold cursor-pointer text-lg outline-0
            ${style == "primary" && "text-white bg-purple-500"}
            ${style == "secondary" && "text-purple-700 bg-white"}
            ${full && "w-full"}
            ${large && "text-2xl"}
            `}
            onClick={onClickHandler}
        >
            {text}
        </button>
    )
}

export default Button
