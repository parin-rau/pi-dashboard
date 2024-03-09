//import "dotenv/config"
import { getCoords } from "../utils/geolocation.js";

const url = "https://api.weather.gov";

export async function getWeather(req, res) {
	const { location } = req.params;

	// const result = await fetch(
	// 	`${url}/points/${LOCATION.lat},${LOCATION.long}`
	// );

	const coords = await getCoords(location);
	console.log(coords);

	const result = await fetch(`${url}/points/${coords.lat},${coords.long}`);

	const weather = await result.json();
	console.log(weather);

	res.send({ coords, weather });
}
