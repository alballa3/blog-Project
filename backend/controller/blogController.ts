import { Request, Response } from "express";
import blogModel, { IBlog } from "../models/blogModel";
import { faker } from '@faker-js/faker';
import z from "zod"
import mongoose from "mongoose";
import { session } from "../models/User";
export async function BlogFactory(req: Request, res: Response) {
    const times = parseInt(req.params.times)
    if (isNaN(times)) {
        res.status(400).send("Invalid input")
    }
    const users = [
        "admin", "mohamemdp;ro", "fasfas"
    ]
    const lopedBlog = Array.from({ length: times }, () => {

        const blog: IBlog = {
            title: faker.lorem.words(),
            description: faker.lorem.paragraphs(),
            content: faker.lorem.paragraphs(),
            created_at: new Date(),
            updated_at: new Date(),
            author: users[Math.floor(Math.random() * users.length)],
            tags: faker.lorem.words(5).split(" "),
            comments: [],
            thunmail: faker.image.avatar(),
            views: Math.floor(Math.random() * 1000),
            likes: Math.floor(Math.random() * 400),
            isPublished: true
        }
        return blog
    }
    )
    const request = await blogModel.insertMany(lopedBlog)
    res.json({ message: "hello world", blogs: lopedBlog })
}
export async function Allblogs(req: Request, res: Response) {
    const { limit = 10, sort = "least" } = req.query
    if (Number.isNaN(Number(limit as string))) {
        res.json({
            error: "Limit must be a number"
        })
    }
    const sortOrder: Record<string, 1 | -1> = sort === "least" ? { created_at: -1 } : { views: 1 };
    const query = await blogModel.find().limit(limit as number).sort(sortOrder);
    res.status(200).send(query)
}
export async function blog(req: Request, res: Response) {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "Invalid blog ID format" });
        return;
    }
    const blog = await blogModel.findByIdAndUpdate(id, {
        $inc: {
            views: 1
        }
    })
    if (!blog) {
        res.status(404).json({ message: "Blog Not Found" })
        return;
    }
    res.status(200).json(blog)
}
export async function search(req: Request, res: Response) {
    const { search = "", limit = 10 } = req.query

    try {
        if (Number.isNaN(Number(limit as string))) {
            res.json({
                error: "Limit must be a number"
            })
        }
        const query = await blogModel.find({
            $text: { $search: search as string, $caseSensitive: false }
        }).limit(10)
        res.json({ blogs: query })
    } catch (error) {
        res.json({ error })
    }
}
export async function createBlog(req: Request, res: Response) {
    const token = req.cookies.token
    const user = session(token)
    const BlogSchema = z.object({
        title: z.string().min(1, "Title is required"),  // Ensures title is a non-empty string
        description: z.string().min(1, "Description is required"),  // Ensures description is a non-empty string
        content: z.string().min(1, "Content is required"),  // Ensures content is a non-empty string
        tags: z.array(z.string()).nonempty("Tags should be an array of strings"),  // Ensures tags is a non-empty array of strings
        isPublished: z.boolean()  // Ensures isPublished is a boolean
    });
    const vaildion = BlogSchema.safeParse(req.body)
    const blog: IBlog = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        tags: req.body.tags,
        author: user.username,
        thunmail: faker.image.avatar(),
        comments: [],
        views: 0,
        likes: 0,
        isPublished: req.body.isPublished
    }
    if (!vaildion.success) {
        res.status(402).json({
            error: vaildion.error.flatten().fieldErrors
        })
        return;
    }
    try {
        const newBlog = await blogModel.create(blog)
        res.json({ message: "Blog Created Successfully", created: newBlog })
    } catch (error) {
        res.status(400).json({ error })
    }
}
export async function like(req: Request, res: Response) {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "Invalid blog ID format" });
        return;
    }
    const blog = await blogModel.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
    if (!blog) {
        res.status(404).json({ message: "Blog Not Found" })
        return;
    }
    res.status(200).json({ message: "Blog Liked Successfully", blog })
}
export async function comment(req: Request, res: Response) {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "Invalid blog ID format" });
        return;
    }
    if (!req.body.content) {
        res.status(400).json({ error: "Please enter a content" })
        return;
    }
    const User = session(req.cookies.token)
    const blog = await blogModel.findByIdAndUpdate(id, { $push: { comments: { author: User.username, content: req.body.content, created_at: new Date() } } }, { new: true })
    if (!blog) {
        res.status(404).json({ message: "Blog Not Found" })
        return;
    }
    res.status(200).json({ message: "Comment Added Successfully", blog })
    return;
}