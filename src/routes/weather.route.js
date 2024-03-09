import express from "express";
import * as weather from "../controllers/weather.controller.js";

export const weatherRouter = express.Router();

weatherRouter.get("/:location", weather.getWeather);
