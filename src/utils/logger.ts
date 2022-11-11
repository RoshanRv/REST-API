import logger from "pino"

const log = logger({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
        },
    },
})

export default log
