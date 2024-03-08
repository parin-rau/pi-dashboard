import { exec, execSync } from "child_process";
import os from "os";

export function hello(req, res) {
	const networkInterfaces = os.networkInterfaces();
	const piExternalIpAddress = networkInterfaces.wlan0[0].address;

	const r1 = execSync("echo 'hello from system controller call'").toString();
	const r2 = execSync("date").toString();

	console.log({ piExternalIpAddress, r1, r2 });
	res.send({ piExternalIpAddress, r1, r2 });
}

export function getIp(req, res) {
	const networkInterfaces = os.networkInterfaces();
	const piExternalIpAddress = networkInterfaces.wlan0[0].address;

	if (piExternalIpAddress) console.log(piExternalIpAddress);

	res.send(piExternalIpAddress);
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
