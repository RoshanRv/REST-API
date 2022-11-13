import mongoose from "mongoose"
import { UserType } from "./users.model"

export interface SessionType extends mongoose.Document {
    user: UserType["_id"]
    valid: boolean
    userAgent: string
    createdAt: Date
    updatedAt: Date
}

const SessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
        },
        valid: {
            type: Boolean,
            default: true,
        },
        userAgent: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model<SessionType>("SessionModel", SessionSchema)
