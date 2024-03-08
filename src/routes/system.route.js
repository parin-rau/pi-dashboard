import express from "express";
import * as system from "../controllers/system.controller.js";

export const systemRouter = express.Router();

systemRouter.get("/", system.hello);
systemRouter.get("/reboot", system.reboot);
systemRouter.get("/shutdown/:time?", system.shutdown);
