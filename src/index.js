import express from "express";
import path from "path";
import { writeToLogFile } from "./utils/logger.js";
import { systemRouter } from "./routes/system.route.js";
import { staticRouter } from "./routes/static.route.js";
import { getDeviceIp } from "./utils/getIp.js";
import { apiRouter } from "./routes/api.route.js";
import { readSettings } from "./utils/settingsApiHelpers.js";
import { runLocalScript } from "./utils/runLocalScript.js";

export const defaultPort = 3000;
export const port = (await readSettings("port").port) ?? defaultPort;

const app = express();
const __dirname = import.meta.dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", staticRouter);
app.use("/api", apiRouter);
app.use("/system", systemRouter);

app.listen(port, () => {
	try {
		const msg = `App listening on ${getDeviceIp()}:${port}`;
		console.log(msg);
		writeToLogFile(`${new Date().toISOString()}: ${msg}\n`);
		runLocalScript(
			"sh",
			path.join(__dirname, "..", "..", "scripts", "open-dashboard-app.sh")
		);
	} catch (e) {
		console.error(e);
		writeToLogFile(e);
	}
});
