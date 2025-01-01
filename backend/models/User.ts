import { Schema } from "mongoose";
import { model } from "mongoose";
import { hash } from "bcrypt";
import jsw from 'jsonwebtoken';
export interface IUser {
    id?: Schema.Types.ObjectId,
    name: string,
    email: string,
    password: string,
    role?: string,
    posts?: Schema.Types.ObjectId,
    session: {
        token: string,
        lastLogin: Date
        expires: Date
    },
    createdAt?: Date
}
const userShema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "member" },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    session: {
        token: { type: String, required: true },
        lastLogin: { type: Date, default: Date.now },
        expires: { type: Date }
    },
    createdAt: { type: Date, default: Date.now }
})
userShema.pre("save", async function (next) {
    const user = this
    if (!user.isModified("password")) {
        return next()
    }
    try {
        user.password = await hash(user.password, 10);
        next();
    }
    catch (error) {
        next(error as Error);
    }
})

interface Isession {
    username: string, email: string
}
// This to get The session For The User inside The Backend Only
export function session(token: string) {
    const decode:Isession = jsw.decode(token) as Isession
    return decode
}

const User = model<IUser>("user", userShema)


export default User;

