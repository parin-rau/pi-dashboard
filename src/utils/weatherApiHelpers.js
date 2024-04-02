import { weatherSchema } from "../db/schema.js";
import { openDb } from "../db/sqlite.js";

export const reducedWeatherInfo = (p) => ({
	name: p.name,
	temperature: p.temperature,
	temperatureUnit: p.temperatureUnit,
	probabilityOfPrecipitation: p.probabilityOfPrecipitation.value,
	windSpeed: p.windSpeed,
	windDirection: p.windDirection,
	shortForecast: p.shortForecast,
	icon: p.icon,
	isDaytime: p.isDaytime,
});

const extractIconInfo = (forecasts) =>
	forecasts.map((f) => {
		const iconUrl = f.icon;
		const { shortForecast } = f;
		const splitUrl = iconUrl.split("/");
		const timeOfDay = splitUrl.find((u) => ["day", "night"].includes(u)); //[splitUrl.length - 2];
		const icon = splitUrl[splitUrl.length - 1].split("?")[0];

		return { shortForecast, timeOfDay, icon, iconUrl };
	});

export const writeWeatherIconInfo = async (forecasts) => {
	const { close, insertMany, makeTable } = await openDb();

	try {
		const table = "weatherIcons";
		await makeTable({ table, schema: weatherSchema });
		const result = await insertMany({
			table,
			set: extractIconInfo(forecasts),
		});
		await close();
		return result;
	} catch (e) {
		console.error(e);
		await close();
	}
};
