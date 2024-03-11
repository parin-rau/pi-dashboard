import "dotenv/config";
import { getCoords } from "../utils/geolocation.js";
import { getDeviceIp } from "../utils/getIp.js";

const url = "https://api.weather.gov";

export async function getWeather(req, res) {
	// const result = await fetch(
	// 	`${url}/points/${LOCATION.lat},${LOCATION.long}`
	// );

	//const coords = await getCoords(location);

	// TODO: add check for location/coordinates in sqlite as default, else prompt for location entry.
	// Don't lookup coordinates if already populated. Limited geolocation API calls.

	//let coords = sql lookup
	let coords;

	// if (!location) {
	// 	return res.send(
	// 		`Enter a valid location at ${getDeviceIp()}/${
	// 			process.env.PORT ?? 3000
	// 		}/config`
	// 	);
	// }

	// if (!coords && location) {
	// 	//coords = await getCoords();
	// }

	coords = { lat: "37.7792588", lon: "-122.4193286" };
	console.log(coords);

	const summaryRes = await fetch(`${url}/points/${coords.lat},${coords.lon}`);

	if (summaryRes.ok) {
		const summary = await summaryRes.json();
		const { forecast, forecastHourly } = summary.properties;
		console.log({ forecast, forecastHourly });

		const forecastRes = await fetch(forecast);

		if (forecastRes.ok) {
			const forecastData = await forecastRes.json();

			const { periods: allPeriods } = forecastData.properties;
			const periods = allPeriods.filter(
				(p) => p.number === 1 || p.isDaytime
			);
			const weather = [];

			periods.forEach((p) => {
				const reducedInfo = {
					name: p.name,
					temperature: p.temperature,
					temperatureUnit: p.temperatureUnit,
					probabilityOfPrecipitation:
						p.probabilityOfPrecipitation.value,
					windSpeed: p.windSpeed,
					windDirection: p.windDirection,
					shortForecast: p.shortForecast,
					icon: p.icon,
				};
				weather.push(reducedInfo);
			});

			return res.send(weather);
		}
	}

	res.send("Unable to fetch weather forecast");
}
