import { Router } from "express";
import { router as authRouter } from "./authentication";
import {router as configRouter } from "./securityOptions";
import { router as customerRouter} from "./customers";
import {router as userRouter} from "./users";
export const router = Router();

router.use("/auth", authRouter);
router.use("/options", configRouter);
router.use("/customers", customerRouter);
router.use("/users", userRouter);
