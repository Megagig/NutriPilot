import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import adminRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";
import fitnessRoutes from "./routes/fitness.routes";
import userRoutes from "./routes/user.routes";
dotenv.config();

const app = express();

app.set("trust proxt", 1);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

//Register Routes in App
app.use("/auth", authRoutes);
app.use("/user", userRoutes)
app.use("/admin", adminRoutes)
app.use("/fitness", fitnessRoutes)

export default app;
