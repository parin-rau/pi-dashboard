import { exec, execSync } from "child_process";
import { getDeviceIp } from "../utils/getIp.js";

export function hello(req, res) {
	res.send("Hi mom!");
}

export function getSettings(req, res) {
	res.send("reading settings");
}

export function setSettings(req, res) {
	res.send("writing settings");
}

export function getIp(req, res) {
	const deviceIp = getDeviceIp() ?? "Can't get server IP address";
	console.log(deviceIp);
	res.send({ ip: deviceIp });
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
