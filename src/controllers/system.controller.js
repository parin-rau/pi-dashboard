import { exec } from "node:child_process";

export function hello(req, res) {
	exec("echo 'hello from system controller call'");
	exec("date");
}

export function reboot(req, res) {
	exec("reboot");
}

export function shutdown(req, res) {
	const time = req.params.time ?? now;

	exec(`shutdown -h ${time}`);
}
