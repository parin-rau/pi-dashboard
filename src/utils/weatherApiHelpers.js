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

const parseIconSrc = ({ isDaytime, shortForecast: s, srcDirectory }) => {
	const getFilename = () => {
		switch (true) {
			case s === "Sunny":
			case s === "Clear":
			case s === "Mostly Sunny":
			case s === "Mostly Clear":
				return isDaytime ? "clear-day.svg" : "clear-night.svg";
			case s === "Partly Cloudy":
			case s === "Partly Sunny":
				return isDaytime
					? "partly-cloudy-day.svg"
					: "partly-cloudy-night.svg";
			case s === "Cloudy":
			case s === "Mostly Cloudy":
				return "cloudy.svg";
			case s === "Fog":
			case s === "Foggy":
				return "fog.svg";
			case s.includes("Showers"):
				return "showers.svg";
			case s.includes("Rain"):
				return "rain.svg";
			case s.includes("Wind"):
				return "windy.svg";
			case s.includes("Snow"):
				return "snow.svg";
			case s.includes("Thunder"):
				return "thunder.svg";
			default:
				return "default.svg";
		}
	};
	return `${srcDirectory}/${getFilename()}`;
};

export const getIcons = (forecasts, limit) => {
	const srcDirectory = "svg";

	if (Array.isArray(forecasts)) {
		const array = [];
		forecasts.forEach((f, idx) => {
			const { isDaytime, shortForecast } = f;

			if (limit > 0 && idx === limit) {
				return array;
			} else {
				array.push(
					parseIconSrc({ isDaytime, shortForecast, srcDirectory })
				);
			}
		});
		return array;
	} else {
		const { isDaytime, shortForecast } = forecasts;
		return parseIconSrc({ isDaytime, shortForecast, srcDirectory });
	}
};

export const shortenDays = (days) => {
	const truncate = (day) => {
		switch (day) {
			case "Sunday":
				return "Sun";
			case "Monday":
				return "Mon";
			case "Tuesday":
				return "Tue";
			case "Wednesday":
				return "Wed";
			case "Thursday":
				return "Thu";
			case "Friday":
				return "Fri";
			case "Saturday":
				return "Sat";
			default: {
				if (day.toLowerCase().includes("night")) {
					return "Tonight";
				} else {
					return "Today";
				}
			}
		}
	};

	if (Array.isArray(days)) {
		return days.map((d) => truncate(d.name));
	} else {
		return truncate(days.name);
	}
};
