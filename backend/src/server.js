import express from "express";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

const app = express();
const PORT = process.env.PORT || 5001;

// --- REPLACED: SMART CORS CONFIGURATION ---
app.use(cors({
    origin: function (origin, callback) {
        // 1. Allow requests with no origin (like Postman or mobile apps)
        if (!origin) return callback(null, true);

        // 2. Allow "localhost" (your computer) AND any "vercel.app" link
        if (origin.includes("localhost") || origin.includes("vercel.app")) {
            return callback(null, true);
        }

        // 3. Block everything else
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
// ------------------------------------------

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});