import express from "express";
//import { systemRouter } from "./system.route.js";
import { weatherRouter } from "./weather.route.js";
import { calendarRouter } from "./calendar.route.js";
//import { staticRouter } from "./static.route.js";

export const apiRouter = express.Router();

//router.use("/static", staticRouter);
//apiRouter.use("/system", systemRouter);
apiRouter.use("/weather", weatherRouter);
apiRouter.use("/calendar", calendarRouter);
