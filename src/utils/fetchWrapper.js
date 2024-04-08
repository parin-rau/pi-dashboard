import { port } from "../index.js";

export const getData = async (endpoint, baseUrl = `http:localhost:${port}`) => {
	const url = `${baseUrl}/api/${endpoint}`;

	try {
		const res = await fetch(url);

		if (res.ok) {
			const data = await res.json();
			return data;
		}
	} catch (e) {
		console.error(e);
	}
};
