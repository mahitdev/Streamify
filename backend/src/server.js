import express from "express";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

const app = express();
const PORT = process.env.PORT || 5001; // Added fallback port just in case

// --- THIS IS THE FIX ---
app.use(cors({
    origin: [
        "http://localhost:5173",                      // Localhost (for when you code on PC)
        "https://streamify-gdhq.vercel.app",          // Vercel Deployment 1
        "https://streamify-delta-five.vercel.app"     // Vercel Deployment 2
    ],
    credentials: true,
}));
// -----------------------

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});