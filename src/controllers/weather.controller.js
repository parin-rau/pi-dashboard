//import "dotenv/config"
import { getCoords } from "../utils/geolocation.js";

const url = "https://api.weather.gov";

export async function getWeather(req, res) {
	const { location } = req.params;

	// const result = await fetch(
	// 	`${url}/points/${LOCATION.lat},${LOCATION.long}`
	// );

	//const coords = await getCoords(location);

	// TODO: add check for location/coordinates in sqlite as default, else prompt for location entry.
	// Don't lookup coordinates if already populated. Limited geolocation API calls.

	const coords = { lat: "37.7792588", lon: "-122.4193286" };
	console.log(coords);

	const result = await fetch(`${url}/points/${coords.lat},${coords.lon}`);

	const weather = await result.json();
	console.log(weather);

	res.send({ coords, weather });
}
