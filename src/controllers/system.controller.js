import * as model from "../models/system.model.js";
import { port } from "../index.js";
import { exec } from "child_process";
import { getDeviceIp } from "../utils/getIp.js";
import { code } from "../utils/status.js";

// export function hello(req, res) {
// 	res.send("Hi mom!");
// }

export async function readConfig(req, res) {
	const data = await model.readConfig();
	res.status(code(data)).send(data);
}

export async function postConfig(req, res) {
	const { location, locationiq_api_key, port } = await req.body;
	//console.log({ location, locationiq_api_key, port });

	const result = await model.postConfig({
		location,
		locationiq_api_key,
		port,
	});

	if (!result || !result.success) {
		res.status(500).redirect("/");
	} else {
		res.redirect("/"); //.send("writing settings")}
	}
}

export function getIp(req, res) {
	const deviceIp = getDeviceIp() ?? "Can't get server IP address";
	console.log(deviceIp);
	res.send({ ip: deviceIp, port: port });
}

export function reboot(req, res) {
	console.log("reboot request received");
	exec("sudo reboot");
}

export function shutdown(req, res) {
	const time = req.params.time ?? "now";

	console.log(
		`Shutdown request received. Shutting down ${
			time === "now" ? time : "at " + time
		}.`
	);
	exec(`sudo shutdown -h ${time}`);
}
