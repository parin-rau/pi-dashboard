import { LOCATION } from "../consts.js";

const url = "https://api.weather.gov";

async function getLocation(req, res) {}

export async function getWeather(req, res) {
	const result = await fetch(
		`${url}/points/${LOCATION.lat},${LOCATION.long}`
	);
	const data = await result.json();

	res.send(data);
}
