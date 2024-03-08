import { exec, execSync } from "child_process";
import os from "os";

export function hello(req, res) {
	const networkInterfaces = os.networkInterfaces();

	const r1 = execSync("echo 'hello from system controller call'");
	const r2 = execSync("date");

	console.log({ networkInterfaces, r1, r2 });
	res.send({ networkInterfaces, r1, r2 });
}

export function getIp(req, res) {
	const networkInterfaces = os.networkInterfaces();
	console.log({ networkInterfaces });
	res.send({ networkInterfaces });
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
