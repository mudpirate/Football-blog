import express from "express";
import { getComments } from "../controllers/commentControllers.js";

const router = express.Router();

router.get("/another", getComments);

export default router;
