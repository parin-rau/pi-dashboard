import express from "express";
import * as calendar from "../controllers/calendar.controller.js";

export const calendarRouter = express.Router();

calendarRouter.get("/", calendar.getCalendar);
