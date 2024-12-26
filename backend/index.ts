import express from "express"
import mongoose from "mongoose"
import route from "./routes/auth"
import cookieParser from "cookie-parser";
import cors from "cors";
import blogRoute from "./routes/blogroute";

const app = express()
const CorsOptions: cors.CorsOptions = {
    origin: process.env.ORIGIN || "http://localhost:5173",
    credentials: true
}
require('dotenv').config()
app.use(cors(CorsOptions))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", route)
app.use("/api/blog",blogRoute)
if (!process.env.MONGO_URI) {
    throw new Error("Mongo DB URL Is Not Set")
}
mongoose.connect(process.env.MONGO_URI as string).then(() => {
    console.log("Mongo db Is Connected")
})
    .catch((e: any) => {
        console.error(e)
    })
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})