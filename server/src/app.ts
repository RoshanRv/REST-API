require("module-alias/register")
import express from "express"
import config from "config"
import * as dotenv from "dotenv"
dotenv.config()

import logger from "./utils/logger"
import connectDB from "./utils/connectDB"
import routes from "./route"
import deserializedUser from "./middleware/deserializedUser"

const PORT = config.get<number>("port")
const app = express()
app.use(express.json())
//middleware.. runs everytime oru server gets a request
app.use(deserializedUser)

app.listen(PORT, async () => {
    logger.info(`Server is Running at ${PORT} `)

    await connectDB()

    routes(app)
})
