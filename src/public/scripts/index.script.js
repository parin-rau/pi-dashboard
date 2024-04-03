import {
	getData,
	getTime, //refreshPageTimer
} from "./utils.js";

//const parent = document.getElementById("content");
const srcDirectory = `./svg`;

getTime.clock();

//refreshPageTimer(60 * 15);

await getData.updateElement({
	elementId: "device-ip",
	url: "/system/ip",
	dataParser: (address) => `${address.ip}:${address.port}`,
});

await getData.updateElement({
	elementId: "big-time",
	dataParser: () => {
		return new Date().toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});
	},
});

// await getData.createMultipleElements({
// 	parentId: "weather",
// 	elementType: "p",
// 	url: "/api/weather",
// 	dataKey: "weather",
// 	dataParser: (data) => {
// 		if (!data.weather) {
// 			return "No weather data received. Check entered location at /config page";
// 		} else {
// 			return data.weather;
// 		}
// 	},
// });

await getData.updateMultipleElementsSingleSource({
	url: "/api/weather",
	elementSchemas: [
		{
			elementId: "location",
			dataKey: "location",
		},
		{
			elementId: "current-icon",
			dataKey: "current",
			elementType: "svg",
			srcDirectory,
		},
		{
			elementId: "current-temp",
			dataKey: "current",
			dataParser: (d) => `${d.temperature}\xB0${d.temperatureUnit}`,
		},
		{
			elementId: "current-wind",
			dataKey: "current",
			dataParser: (d) => `${d.windSpeed} ${d.windDirection}`,
		},
		{
			elementId: "current-desc",
			dataKey: "current",
			dataParser: (d) => d.shortForecast,
		},
		{
			elementType: "span",
			dataKey: "current",
			dataParser: (d) => d.shortForecast,
		},
		{
			elementType: "span",
			dataKey: "upcoming",
			dataParser: (d) => d.shortForecast,
		},
		{
			elementId: "upcoming",
			srcDirectory,
		},
	],
});
