import { exec } from "child_process";

export function hello(req, res) {
	exec("sudo echo 'hello from system controller call'");
	exec("sudo date");
}

export function reboot(req, res) {
	exec("sudo reboot");
}

export function shutdown(req, res) {
	const time = req.params.time ?? now;

	exec(`sudo shutdown -h ${time}`);
}
