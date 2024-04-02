import express from "express";
import * as controller from "../controllers/weather.controller.js";

export const weatherRouter = express.Router();

weatherRouter.get("/", controller.getWeather);
