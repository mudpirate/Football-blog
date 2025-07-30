import express from "express";
import "dotenv/config";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import webhookRouter from "./routes/webHookRoutes.js";

import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./lib/connectDB.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(ClerkExpressWithAuth());
app.use(clerkMiddleware());

app.use("/webhooks", webhookRouter);

// ✅ JSON body parser
app.use(express.json());

// ✅ Clerk middlewares

// ✅ Routes

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// ✅ Error handler
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
