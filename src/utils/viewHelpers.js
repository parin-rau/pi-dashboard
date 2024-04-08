//import { getData } from "./fetchWrapper";
import { getForecast } from "../models/weather.model.js";
import { getDeviceIp } from "./getIp.js";
import { getIcons, shortenDays } from "./weatherApiHelpers.js";
import { getTime } from "./time.js";

export const getIndexData = async () => {
	// const weather = {
	//     ...rawWeather,
	//     currentIcon: getIcons(rawWeather.current),
	//     upcomingIcons: getIcons(rawWeather.upcoming),
	//     upcomingNames: shortenDays(rawWeather.upcoming),
	// }

	const time = getTime;
	const ip = getDeviceIp();

	const weather = await getForecast();
	const currentIcon = getIcons(weather.current);
	const upcomingIcons = getIcons(weather.upcoming, 3);
	const upcomingNames = shortenDays(weather.upcoming, 3);

	const events = [];
	const emails = 0;

	// res.render("../views/index.ejs", {
	// 	weather,
	// 	currentIcon,
	// 	upcomingIcons,
	// 	upcomingNames,
	// 	events,
	// 	emails,
	// });

	return {
		time,
		ip,
		weather,
		currentIcon,
		upcomingIcons,
		upcomingNames,
		events,
		emails,
	};
};
