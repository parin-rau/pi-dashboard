import path from "path";
import fs from "fs";

// run file with Node to generate iconMapping array

const __dirname = import.meta.dirname;
const svgDirectory = path.join(__dirname, "..", "public", "svg");

export const iconMapping = [
	{
		svg: "clear-day.svg",
		shortForecast: ["Sunny", "Clear"],
		timeOfDay: "day",
	},
	{ svg: "clear-night.svg", shortForecast: ["Clear"], timeOfDay: "night" },
	{ svg: "cloudy-wind.svg", shortForecast: [], timeOfDay: "either" },
	{ svg: "cloudy.svg", shortForecast: ["Cloudy"], timeOfDay: "either" },
	{ svg: "heavy-rain.svg", shortForecast: [], timeOfDay: "either" },
	{
		svg: "light-showers.svg",
		shortForecast: ["Chance Rain Showers"],
		timeOfDay: "either",
	},
	{
		svg: "mostly-cloudy.svg",
		shortForecast: ["Mostly Cloudy"],
		timeOfDay: "either",
	},
	{
		svg: "partly-cloudy-day.svg",
		shortForecast: ["Partly Cloudy"],
		timeOfDay: "day",
	},
	{
		svg: "partly-cloudy-night.svg",
		shortForecast: ["Partly Cloudy"],
		timeOfDay: "night",
	},
	{
		svg: "rain-partly-clear-day.svg",
		shortForecast: [],
		timeOfDay: "day",
	},
	{
		svg: "rain-partly-clear-night.svg",
		shortForecast: [],
		timeOfDay: "night",
	},
	{ svg: "rain.svg", shortForecast: [], timeOfDay: "either" },
	{
		svg: "showers-partly-clear-day.svg",
		shortForecast: [],
		timeOfDay: "day",
	},
	{
		svg: "showers-partly-clear-night.svg",
		shortForecast: [],
		timeOfDay: "night",
	},
	{ svg: "showers.svg", shortForecast: [], timeOfDay: "either" },
	{ svg: "sleet.svg", shortForecast: [], timeOfDay: "either" },
	{
		svg: "snow-partly-clear-day.svg",
		shortForecast: [],
		timeOfDay: "day",
	},
	{
		svg: "snow-partly-clear-night.svg",
		shortForecast: [],
		timeOfDay: "night",
	},
	{ svg: "snow.svg", shortForecast: [], timeOfDay: "either" },
	{ svg: "thunder.svg", shortForecast: [], timeOfDay: "either" },
	{ svg: "thunderstorm.svg", shortForecast: [], timeOfDay: "either" },
	{
		svg: "wind-partly-clear-day.svg",
		shortForecast: [],
		timeOfDay: "day",
	},
	{
		svg: "wind-partly-clear-night.svg",
		shortForecast: [],
		timeOfDay: "night",
	},
	{ svg: "windy.svg", shortForecast: [], timeOfDay: "either" },
];

const getIconNames = () => {
	const timeOfDay = (file) => {
		const filename = file.split(".")[0];
		if (filename.slice(-3) === "day") {
			return "day";
		} else if (filename.slice(-5) === "night") {
			return "night";
		} else {
			return "either";
		}
	};

	fs.readdirSync(svgDirectory).forEach((f) =>
		iconMapping.push({
			svg: f,
			shortForecast: [],
			timeOfDay: timeOfDay(f), //f.split(".")[0].slice(-3) === "day" ? "day" : "night",
		})
	);
	console.log(iconMapping);
};

getIconNames();
