import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import userRouter from "./routes/user"
import "./lib/override"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth"

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: ["http://localhost:3000", "http://172.22.57.194:3000"],
  credentials: true
}));


app.use("/user", userRouter)
app.use("/auth", authRouter)

app.listen(4000)