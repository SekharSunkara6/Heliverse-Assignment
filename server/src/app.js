import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
))

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// -------------routes --------
import loginRouter from "./routes/login.route.js";
app.use("/api/user", loginRouter)

import teacherRouter from "./routes/teacher.routes.js"
app.use('/api/user/teacher',teacherRouter)

import principalRouter from "./routes/principal.routes.js"
app.use("/api/user/dashboard", principalRouter)

import studentRouter from "./routes/student.routes.js"
app.use("/api/user/student",studentRouter);


export default app