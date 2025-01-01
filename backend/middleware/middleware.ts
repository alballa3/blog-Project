import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import User from "../models/User";
// It Simple And Fast but not secure way to check if the user is logged in or not because the user can create a token inside a cookie
// and access the protected routes 
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token: string | null = req.cookies?.token || null;

    if (!token) {
        res.status(400).json({
            error: "Token not provided"
        });
        return;
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!verified) {
            res.status(400).json({
                error: "Unable to verify the token"
            });
        }
        // Proceed with your logic
        next()
    } catch (error) {
        res.status(400).json({
            error: "Invalid or expired token"
        });
    }
}
// Middleware To For The Guest user ONLY
export function guestMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token;
    if (token) {
        res.status(400).json({
            error: "You are already logged in"
        })
        return;
    }
    next()
}
//It More Secure But Slower use for importand tasks 

export async function betterAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const token: string | null = req.cookies?.token || null;
    if (!token) {
        res.status(400).json({
            error: "You Must To be Auth"
        });
        return;
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!verified) {
            res.status(400).json({
                error: "Unable to verify the token"
            });
            return;
        }
        // Check the token if it was in the data base or it generated or not
        const checkToken = await User.findOne({
            "session.token": token
        })
        if (!checkToken) {
            res.status(400).json({
                error: "Token was not found in the database"
            })
            return;
        }
        // Load the page
        next()
    } catch (error) {
        res.status(400).json({
            error: "Invalid or expired token"
        });
    }
}

export function devMiddleware(req: Request, res: Response, next: NextFunction) {
    const respond = process.env.project
    if (respond != "development") {
        res.status(500).json({
            error: "Server Error"
        })
        return;
    }
    next()
}