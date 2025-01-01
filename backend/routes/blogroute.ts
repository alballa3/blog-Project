import { Router } from "express";
import { Allblogs, blog, BlogFactory, comment, createBlog, like, search } from "../controller/blogController";
import { betterAuthMiddleware, devMiddleware } from "../middleware/middleware";

const blogRoute = Router()

// Importing the controller functions

// Factory is simply just to Generate Data For The Database only inside development
blogRoute.get("/factory/:times", devMiddleware, BlogFactory)
// Return least and most poplure blogs
blogRoute.get("/", Allblogs)

// To Create One Blog
blogRoute.post("/create", betterAuthMiddleware, createBlog)

// To Search Blog By Title or Description
// Search Inside The Title and desction and contect to get one or multiple 
blogRoute.get("/search", search)
// Return a one blog
blogRoute.get("/:id", blog)
//Here The User Can like This blog

blogRoute.put("/:id", betterAuthMiddleware, like)
// The Route For The User to comment a post

blogRoute.post("/:id", betterAuthMiddleware, comment)




export default blogRoute;