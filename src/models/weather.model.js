import {
	reducedWeatherInfo,
	writeWeatherIconInfo,
} from "../utils/weatherApiHelpers.js";
//import { getDeviceIp } from "../utils/getIp.js";
//import { defaultPort } from "../index.js";
//import { getSettings, writeSettings } from "../utils/settingsApiHelpers.js";
import { getCoords } from "../utils/geolocation.js";

const weatherApi = "https://api.weather.gov";

export const getForecast = async () => {
	//const coords = { lat: "37.7792588", lon: "-122.4193286" };
	//TODO: change coords to be result of db select call
	try {
		const coordsResult = await getCoords();

		if (!coordsResult.coords) {
			return { success: false, weather: undefined };
		}
		const { lat, lon } = coordsResult.coords;

		const summaryRes = await fetch(`${weatherApi}/points/${lat},${lon}`);

		if (summaryRes.ok) {
			const summary = await summaryRes.json();
			const { forecast, forecastHourly } = summary.properties;
			const forecastRes = await fetch(forecast);
			const forecastHourlyRes = await fetch(forecastHourly);

			if (forecastRes.ok && forecastHourlyRes.ok) {
				const forecastData = await forecastRes.json();
				const forecastHourlyData = await forecastHourlyRes.json();

				const currentWeather = forecastHourlyData.properties.periods[0];
				//const trimmedCurrentWeather = reducedWeatherInfo(currentWeather);

				const { periods } = forecastData.properties;
				const upcoming = periods
					.filter((p) => p.number === 1 || p.isDaytime)
					.map((p) => reducedWeatherInfo(p));

				const current = reducedWeatherInfo(currentWeather);

				await writeWeatherIconInfo([current, ...upcoming]);

				return { current, upcoming, success: true };
			}
		}
	} catch (e) {
		console.error(e);
		return { success: false, weather: undefined };
	}
};
