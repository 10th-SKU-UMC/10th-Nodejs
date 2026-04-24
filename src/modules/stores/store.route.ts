import express from "express";
import { createStore } from "./controllers/store.controller";

const router = express.Router();

router.post("/stores", createStore);

export default router;