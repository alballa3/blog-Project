import { Request, Response } from "express";
import { z } from "zod";
import User, { IUser, } from "../models/User";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
const generateToken = (payload: object) => {
    const token: string = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "30d" })
    return token
}
export async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body
    const schama = z.object({
        password: z.string().min(8, "The Password Must At least Include 8 letters"),
        email: z.string().email()
    })
    const vaildtion = schama.safeParse({ email, password })
    if (!vaildtion.success) {
        res.status(400).json({ error: vaildtion.error.flatten().fieldErrors })
        return;
    }
    // Check if The User Exists
    const user = await User.findOne({
        email: email
    })
    if (!user) {
        res.status(400).json({ error: "The User Not Found" })
        return;
    }
    const confirmpassword = await compare(password, user.password)
    if (!confirmpassword) {
        res.status(400).json({ error: "The Password Or The Email Is Not Correct" })
        return;
    }

    //generate Token
    const token: string = generateToken({ email: user.email, username: user.name })
    user.session.token = token
    user.session.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    user.session.lastLogin = new Date()
    res.cookie("token", user.session.token, {
        expires: user.session.expires,
        httpOnly: true
    }
    )
    await user.save()
    // Check if The Password Is Correct
    res.json({ message: user })
}

export async function register(req:Request, res: Response): Promise<void> {
    const { username, password, email } = req.body
    const schama = z.object({
        email: z.string().email(),
        password: z.string().min(8, "The Password Must At least Include 8 letters"),
        username: z.string().min(3, "The Username Must At least Include 3 letters")
    })
    const vaildtion = schama.safeParse({ email, username, password })
    if (!vaildtion.success) {
        res.status(400).json({ error: vaildtion.error.flatten().fieldErrors })
        return;
    }
    // Check if The User email Exites

    const checkUser = await User.findOne({
        email: email
    })
    if (checkUser) {
        res.status(400).json({ error: "The User Email Already Exists" })
        return;
    }
    //generate Token
    try {
        const token: string = generateToken({ email, username })
        const user = new User<IUser>({
            email: email,
            password: password,
            name: username,
            session: {
                token: token,
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                lastLogin: new Date()
            }
        })
        
        res.cookie("token", user.session.token, {
            expires: user.session.expires,
            httpOnly: true
        })

        await user.save()
        res.status(201).json({ token: token, user: user })

    } catch (error) {
        res.status(500).json({ error: error, message: "Internal Server Error" })
    }


}
export async function logout(req: Request, res: Response): Promise<void> {
    res.clearCookie("token")
    res.json({ message: "Logout Successfully" })
}
export async function session(req: Request, res: Response): Promise<void> {
    try {
        const token = req.cookies?.token
        const session = jwt.verify(token, process.env.JWT_SECRET as string)
        res.json({ session })
    } catch (error) {
        res.status(400).json({ error: error })
    }
}