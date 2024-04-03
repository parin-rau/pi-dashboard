export const parseIconSrc = ({ isDaytime, shortForecast: s, srcDirectory }) => {
	const getFilename = () => {
		switch (true) {
			case s === "Sunny":
			case s === "Clear":
			case s === "Mostly Sunny":
			case s === "Mostly Clear":
				return isDaytime ? "clear-day.svg" : "clear-night.svg";
			case s === "Partly Cloudy":
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
