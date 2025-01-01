import express from "express"
import mongoose from "mongoose"
import route from "./routes/auth"
import cookieParser from "cookie-parser";
import cors from "cors";
import blogRoute from "./routes/blogroute";

const app = express()
require('dotenv').config()

// This For Cors origin And here Where You put Your Frontend From the .env File
const CorsOptions: cors.CorsOptions = {
    origin: process.env.ORIGIN || "http://localhost:5173",
    credentials: true
}
app.use(cors(CorsOptions))
// The Project set up
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



// The Route For The project
app.use("/api/auth", route)
app.use("/api/blog", blogRoute)







// here Mongo db Set Up And to check the database if everything is working alright 
if (!process.env.MONGO_URI) {
    throw new Error("Mongo DB URL Is Not Set")
}
mongoose.connect(process.env.MONGO_URI as string).then(() => {
    console.log("Mongo db Is Connected")
})
    .catch((e: any) => {
        console.error(e)
    })
// Here the Server is listening on port 5000
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})