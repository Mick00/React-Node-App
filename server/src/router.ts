import { Router } from "express";
import {router as apiRouter} from "./routes/api/ApiRouter";

export const router = Router();

router.use("/api/v1", apiRouter);
