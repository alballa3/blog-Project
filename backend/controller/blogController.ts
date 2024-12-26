import { Request, Response } from "express";
import blogModel, { IBlog } from "../models/blogModel";
import { faker } from '@faker-js/faker';
export function BlogFactory(req: Request, res: Response) {
    const times = parseInt(req.params.times)
    if (isNaN(times)) {
        res.status(400).send("Invalid input")
    }
    const users = [
        "6767c768ae404ea3a839425b",
        "6767c760ae404ea3a8394255",
        "676a9bb59d8ec4e99fdb1322",
        "676a9bef9d8ec4e99fdb1326",
        "676ae1d70549b5dd630bcf3b"
    ]
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
    // const lopedBlog=Array.from({length:times},()=>blog)
    res.json({message:"hello world"})
}
export async function Allblogs(req: Request, res: Response) {
    const { limit = 10, sort = "least", search = "", tags = [] } = req.query
    const sortOrder: Record<string,1|-1>= sort === "least" ? { created_at: -1 } : { views: 1 };
    const query = await blogModel.find().limit(limit as number).sort(sortOrder);
    res.status(200).send(query)
}

Array.from