import { exec, execSync } from "child_process";
import os from "os";
import { getDeviceIp } from "../utils/getIp.js";

export function hello(req, res) {
	const deviceIp = getDeviceIp();

	const r1 = execSync("echo 'hello from system controller call'").toString();
	const r2 = execSync("date").toString();

	console.log({ deviceIp, r1, r2 });
	res.send({ deviceIp, r1, r2 });
}

export function getIp(req, res) {
	const deviceIp = getDeviceIp() ?? "Can't get server IP address";
	console.log(deviceIp);
	res.send(deviceIp);

	// const networkInterfaces = os.networkInterfaces();
	// const { platform, arch } = { platform: os.platform(), arch: os.arch() };

	// switch (true) {
	// 	// Windows
	// 	case platform === "win32" && arch === "x64":
	// 		console.log("windows detected");
	// 		const externalIpAddress = networkInterfaces;
	// 		if (externalIpAddress) return res.send(externalIpAddress);
	// 		else return res.send("Can't get IP address");

	// 	// RPI
	// 	case platform === "linux" && arch === "arm": {
	// 		console.log("RPI detected");
	// 		const piExternalIpAddress = networkInterfaces.wlan0[0].address;
	// 		if (piExternalIpAddress) return res.send(piExternalIpAddress);
	// 		else return res.send("can't get IP address");
	// 	}
	// }

	// if (piExternalIpAddress) console.log(piExternalIpAddress);

	// res.send(piExternalIpAddress);
}

export function reboot(req, res) {
	console.log("reboot request received");
	exec("sudo reboot");
}

export function shutdown(req, res) {
	const time = req.params.time ?? "now";

	console.log(
		`Shutdown request received. Shutting down ${
			time ? "at " + time : "immediately"
		}.`
	);
	exec(`sudo shutdown -h ${time}`);
}
