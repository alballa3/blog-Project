import { Router } from "express";
import { Allblogs, BlogFactory } from "../controller/blogController";
import { devMiddleware } from "../middleware/middleware";

const blogRoute = Router()

// Importing the controller functions

blogRoute.get("/factory/:times", devMiddleware ,BlogFactory)
blogRoute.get("/",Allblogs)


export default blogRoute;