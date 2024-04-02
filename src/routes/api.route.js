import express from "express";
import { weatherRouter } from "./weather.route.js";
import { calendarRouter } from "./calendar.route.js";

export const apiRouter = express.Router();

apiRouter.use("/weather", weatherRouter);
apiRouter.use("/calendar", calendarRouter);
