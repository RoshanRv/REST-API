import mongoose, { Document } from "mongoose"
import bcrypt from "bcrypt"
import config from "config"

export interface UserType extends Document {
    email: string
    name: string
    password: string
    createdAt: Date
    updatedAt: Date
    comparePassword: (candidatePassword: string) => Promise<boolean>
}

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        name: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

// .pre("save") is triggered when UserSchema is saved

UserSchema.pre("save", async function (next) {
    let user = this as unknown as UserType

    console.log(this)

    // password is hashed only when the password is modified or new password. (Password is not hashed when other properties are updated)

    if (!user.isModified("password")) next()

    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
    const hash = await bcrypt.hash(user.password, salt)

    user.password = hash

    return next()
})

// comparePassword is a function created by me to validate password, it can be invoked by model.comparePassword()
//It is invoked at users.services.ts

UserSchema.methods.comparePassword = async function (
    canditatePassword: string
): Promise<boolean> {
    let user = this as unknown as UserType

    return await bcrypt
        .compare(canditatePassword, user.password)
        .catch((e) => false)
}

export default mongoose.model<UserType>("UserModel", UserSchema)
