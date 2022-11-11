import mongoose from "mongoose"
import logger from "./logger"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        logger.info(`Database is connected at ${conn.connection.host}`)
    } catch (err) {
        logger.error(err)
    }
}

export default connectDB
