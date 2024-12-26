import { Router } from "express";
import { login, logout, register, session } from "../controller/userController";
import { authMiddleware, guestMiddleware } from "../middleware/middleware";
const route = Router()



route.post("/login", guestMiddleware, login)
route.post("/register", guestMiddleware, register)
route.get("/logout", authMiddleware, logout)
route.get("/session", authMiddleware, session)
export default route