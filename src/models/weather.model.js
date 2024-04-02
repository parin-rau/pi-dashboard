import {
	reducedWeatherInfo,
	writeWeatherIconInfo,
} from "../utils/weatherApiHelpers.js";
import { getCoords } from "../utils/geolocation.js";

const weatherApi = "https://api.weather.gov";

export const getForecast = async (
	{ saveIconInfo } = { saveIconInfo: false }
) => {
	try {
		const coordsResult = await getCoords();

		if (!coordsResult.coords) {
			return { success: false, weather: undefined };
		}
		const { lat, lon, location } = coordsResult.coords;

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

				const { periods } = forecastData.properties;
				const upcoming = periods
					.filter((p) => p.number === 1 || p.isDaytime)
					.map((p) => reducedWeatherInfo(p));

				const current = reducedWeatherInfo(currentWeather);
				if (saveIconInfo === true)
					await writeWeatherIconInfo([current, ...upcoming]);

				return { current, upcoming, location, success: true };
			}
		}
	} catch (e) {
		console.error(e);
		return {
			success: false,
			current: undefined,
			upcoming: undefined,
			location: undefined,
		};
	}
};
