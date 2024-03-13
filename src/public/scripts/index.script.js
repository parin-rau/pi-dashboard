import { getData, getTime } from "./utils.js";

const parent = document.getElementById("content");

// TODO: GET TIME / WEATHER FROM WEATHER API WITH FIXED LOCATION
// TODO: CHECK FOR LOCATION IN SQLITE ELSE PROMPT FOR CONFIG LOCATION ENTRY

getTime.clock(5);

await getData.updateElement({
	elementId: "device-ip",
	url: "/system/ip",
	dataParser: (address) => address.ip,
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

await getData.createMultipleElementsSingleSource({
	parentId: "weather",
	url: "/api/weather",
	elementSchemas: [
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
	],
});
