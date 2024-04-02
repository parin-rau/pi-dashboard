export const parseIconSrc = ({ isDaytime, shortForecast, srcDirectory }) => {
	const getFilename = () => {
		switch (shortForecast) {
			case "Sunny":
			case "Clear":
				return isDaytime ? "clear-day.svg" : "clear-night.svg";
			case "Mostly Sunny":
			case "Mostly Clear":
			case "Partly Cloudy":
				return isDaytime
					? "partly-cloudy-day.svg"
					: "partly-cloudy-night.svg";
			default:
				return "default.svg";
		}
	};
	return `${srcDirectory}/${getFilename()}`;
};
