import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js"

const app = express();

// MIDDLEWARES
app.use(morgan("dev"));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// ROUTES
app.use("/api/v1/user",userRoute);

export default app;