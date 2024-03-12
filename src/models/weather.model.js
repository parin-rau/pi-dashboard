import { openDb } from "../db/sqlite.js";
import { weatherSchema } from "../db/schema.js";

import { mockForecast } from "../test/testData.js";

const { initTable, insertRow, close } = openDb();
const table = "weatherIcons";
const weatherApi = "https://api.weather.gov";

const reducedInfo = (p) => ({
	name: p.name,
	temperature: p.temperature,
	temperatureUnit: p.temperatureUnit,
	probabilityOfPrecipitation: p.probabilityOfPrecipitation.value,
	windSpeed: p.windSpeed,
	windDirection: p.windDirection,
	shortForecast: p.shortForecast,
	icon: p.icon,
});

const getForecast = async () => {
	const coords = { lat: "37.7792588", lon: "-122.4193286" };
	//TODO: change coords to be result of db select call

	const summaryRes = await fetch(
		`${weatherApi}/points/${coords.lat},${coords.lon}`
	);

	if (summaryRes.ok) {
		const summary = await summaryRes.json();
		const { forecast, forecastHourly } = summary.properties;
		const forecastRes = await fetch(forecast);
		const forecastHourlyRes = await fetch(forecastHourly);

		if (forecastRes.ok && forecastHourlyRes.ok) {
			const forecastData = await forecastRes.json();
			const forecastHourlyData = await forecastHourlyRes.json();

			const currentWeather = forecastHourlyData.properties.periods[0];
			const trimmedCurrentWeather = reducedInfo(currentWeather);

			const { periods: allPeriods } = forecastData.properties;
			const periods = allPeriods.filter(
				(p) => p.number === 1 || p.isDaytime
			);
			const weather = { current: trimmedCurrentWeather, upcoming: [] };

			periods.forEach((period) => {
				weather.upcoming.push(reducedInfo(period));
			});

			return weather;
		}
	}
};

const extractIconInfo = (iconUrl) => {
	const splitUrl = iconUrl.split("/");
	const timeOfDay = splitUrl.find((u) => ["day", "night"].includes(u)); //[splitUrl.length - 2];
	const icon = splitUrl[splitUrl.length - 1].split("?")[0];

	return { timeOfDay, icon, iconUrl };
};

export const saveWeatherIcons = async () => {
	const result = {
		insertedRowCount: 0,
		success: false,
		status: 403,
	};

	try {
		const forecast = mockForecast; //await fetchRawWeather();
		//console.log({ forecast });

		initTable(table, weatherSchema);

		forecast.forEach((p) => {
			const { timeOfDay, icon, iconUrl } = extractIconInfo(p.icon);
			const { shortForecast } = p;
			insertRow({
				table,
				set: { icon, iconUrl, timeOfDay, shortForecast },
			});
			result.insertedRowCount += 1;
		});

		close();
		result.success = true;
		return result;
	} catch (e) {
		close();
		console.error(e.message);
		return result;
	}
};
