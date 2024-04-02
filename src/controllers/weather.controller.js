import * as model from "../models/weather.model.js";
import { code } from "../utils/status.js";

export async function getWeather(req, res) {
	const result = await model.getForecast();
	res.status(code(result)).send(result);
}
