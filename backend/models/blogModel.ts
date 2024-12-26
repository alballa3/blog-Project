import { model, Schema } from "mongoose"

export interface IBlog {
    title: string,
    description: string,
    content: string,
    created_at: Date,
    updated_at: Date
    author: string,
    tags: Array<string>
    comments: Array<{
        author: string,
        content: string,
        created_at: Date
    }>,
    thunmail: string,
    views: number,
    likes: number
    isPublished: boolean
}

// MongoDB Schema

const blogSchema = new Schema<IBlog>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    author: { type: String, required: true, ref: "users" },
    tags: [{ type: Schema.Types.Array, required: true }],
    thunmail: { type: String },
    comments: [{
        author: { type: String, required: true, ref: "users" },
        content: { type: String, required: true },
        created_at: { type: Date, default: Date.now }
    }],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false }
})

const blogModel = model<IBlog>("Blog", blogSchema)

export default blogModel