import { readSettings, writeSettings } from "./settingsApiHelpers.js";
import { getDeviceIp } from "./getIp.js";
import { defaultPort } from "../index.js";

export const getCoords = async () => {
	const coords = await readSettings(["lat", "lon", "location"]);

	if (!coords || !coords.lat || !coords.lon) {
		console.log(
			"Missing coordinates. Looking up coordinates from saved location name."
		);
		const locationResults = await getCoordsFromLocation();
		return locationResults;
	} else {
		//console.log(coords);
		return { coords, success: true };
	}
};

const getCoordsFromLocation = async () => {
	const deviceIp = getDeviceIp();
	const settings = //{ location, port, locationiq_api_key }
		await readSettings(["location", "locationiq_api_key", "port"]);

	//IF NO SETTINGS, PROMPT
	if (!settings) {
		console.log(
			`Enter a valid location at ${deviceIp}/${defaultPort}/config`
		);
		return { coords: undefined, success: false };
	}

	const { location, port, locationiq_api_key } = settings;

	//IF NO LOCATION, PROMPT
	if (!location) {
		const devicePort = port ?? defaultPort;
		console.log(
			`Enter a valid location at ${deviceIp}/${devicePort}/config`
		);
		return { coords: undefined, success: false };
	}

	//LOOKUP COORDINATES
	const { coords: newCoords, success } = await getCoordsExternal({
		location,
		apiKey: locationiq_api_key,
	});
	if (!success) {
		console.log(`Unable to find coordinates for ${location}.`);
		return { coords: undefined, success };
	}

	console.log(
		`Found coordinates for ${location}: {lat: ${newCoords.lat}, lon: ${newCoords.lon}}`
	);

	//SAVE COORDINATES
	await writeSettings({ lat: newCoords.lat, lon: newCoords.lon });

	//RETURN COORDINATES
	return { coords: newCoords, success: true };
};

export async function getCoordsExternal({ location, apiKey }) {
	const url = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURI(
		location
	)}&format=json`;

	const res = await fetch(url);

	if (res.ok) {
		const results = await res.json();
		results.sort((a, b) => b.importance - a.importance);

		const coords = { lat: results[0].lat, lon: results[0].lon };
		return { coords, success: true };
	} else {
		return {
			success: false,
			coords: undefined,
		};
	}
}
