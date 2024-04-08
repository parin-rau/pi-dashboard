import os from "os";
import { port } from "../index.js";

export function getDeviceIp() {
	const networkInterfaces = os.networkInterfaces();

	for (const adapter in networkInterfaces) {
		for (let i = 0; i < networkInterfaces[adapter].length; i++) {
			const address = networkInterfaces[adapter][i].address
				.toString()
				.split(".");

			if (
				address[0] === "192" &&
				address[1] === "168"
				//&& address[2] === "1"
			) {
				return `${address.join(".").toString()}:${port}`;
			}
		}
	}
}

// export async function getPublicIp() {
// 	const url = "https://api.ipify.org?format=json";

// 	const res = await fetch(url);
// 	if (res.ok) {
// 		const publicIp = await res.json();
// 		return publicIp["ip"];
// 	}
// }

// export async function getCoords() {
// 	const publicIp = await getPublicIp();
// 	const url = "https://freegeoip.app/json"; //`https://freegeoip.io/json/${publicIp}`;

// 	const res = await fetch(url);
// 	if (res.ok) {
// 		const coords = await res.json();
// 		return coords;
// 	}
// }
