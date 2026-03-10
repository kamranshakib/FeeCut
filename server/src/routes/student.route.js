import express from "express";
const router = express.Router();
import { addStudent } from "../controllers/srudent.controller.js";

router.post("/students", addStudent);

export default router;
