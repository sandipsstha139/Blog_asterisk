import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js"
import globalErrorHandler from './controllers/error.controller.js';

const app = express();

// MIDDLEWARES
app.use(morgan("dev"));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// ROUTES
app.use("/api/v1/user",userRoute);

app.use(globalErrorHandler)

export default app;