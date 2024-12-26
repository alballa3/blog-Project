import { NextFunction, Request, Response } from "express";
// It Simple And Fast but not secure way to check if the user is logged in or not because the user can create a token inside a cookie
// and access the protected routes 
export function authMiddleware(req:Request,res:Response,next:NextFunction){
    const token = req.cookies?.token;
    if(! token){
        res.status(400).json({
            error:"You are not logged in"
        })
        return;
    }
    next()
}
// Middleware To For The Guest user ONLY
export function guestMiddleware(req:Request,res:Response,next:NextFunction){
    const token = req.cookies?.token;
    if(token){
         res.status(400).json({
            error:"You are already logged in"
        })
        return;
    }
    next()
}

export function devMiddleware(req:Request,res:Response,next:NextFunction){
    const respond=process.env.project
    console.log(respond)
    if(respond=="development"){
        next()
    }
    res.status(500).json({
        error:"Server Error"
    })
    return;
}