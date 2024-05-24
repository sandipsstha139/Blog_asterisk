import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/user.route.js";
import globalErrorHandler from "./controllers/error.controller.js";

const app = express();

// MIDDLEWARES
    methods: ["GET", "POST", "DELETE", "PUT"],
    app.use(
        cors({
          origin: ["http://localhost:5173"],
          methods: ["GET", "POST", "DELETE", "PUT"],
          credentials: true,
        })
      );
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/v1/user", userRoute);

app.use(globalErrorHandler);

export default app;
