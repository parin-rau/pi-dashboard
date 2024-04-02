import { existsSync } from "fs";
import { exec } from "child_process";

export const runLocalScript = (command, filepath) => {
	const fileExists = existsSync(filepath);

	if (!fileExists) {
		return console.log(
			`Filepath "${filepath}" does not exist on server machine`
		);
	}

	const result = exec(`${command} ${filepath}`);
	console.log(`Running script locally on server machine: ${filepath}`);
	return result;
};
