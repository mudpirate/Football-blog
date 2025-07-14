import express from "express";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import webhookRouter from "./routes/webhookRoutes.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import connectDB from "./lib/connectDB.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(clerkMiddleware());

app.use("/webhooks", webhookRouter);
app.use(express.json());

// Add request logging middleware
// app.get("/auth-state", (req, res) => {
//   const authState = req.auth();
//   res.json(authState);
// });

// app.get("/protect", (req, res) => {
//   const { userId } = req.auth;
//   if (!userId) {
//     return res.status(401).json("not authenticted");
//   }
//   res.status(200).json("content");
// });
// app.get("/protect2", requireAuth(), (req, res) => {
//   res.status(200).json("content");
// });

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  connectDB();
  console.log("server running");
});
