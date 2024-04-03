import fs from "fs";
import path from "path";

const __dirname = import.meta.dirname;
const filename = "server.log";
const pathname = path.join(__dirname, "..", "..", filename);

export const writeToLogFile = (text) => {
	fs.writeFile(pathname, text, { flag: "a" }, (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log(`Wrote to log file at "${pathname}"`);
		}
	});
};
