import "dotenv/config";

export async function getCoords(location) {
	const url = `https://us1.locationiq.com/v1/search?key=${process.env.LOCATIONIQ_API_KEY}&q=${location}&format=json`;

	const res = await fetch(url);

	if (res.ok) {
		const results = await res.json();
		results.sort((a, b) => a.importance - b.importance);

		const coords = { lat: results[0].lat, long: results[0].long };
		return coords;
	}
}
