import "dotenv/config";
import express from "express";
import path from "path";
import { systemRouter } from "./routes/system.route.js";
import { weatherRouter } from "./routes/weather.route.js";
import { calendarRouter } from "./routes/calendar.route.js";
import { staticRouter } from "./routes/static.route.js";
import { getDeviceIp, getPublicIp } from "./utils/getIp.js";

const app = express();
const port = process.env.PORT ?? 3000;
const __dirname = import.meta.dirname;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.send("hello from pi server");
});

//app.use("/");
app.use("/static", staticRouter);
app.use("/system", systemRouter);
app.use("/weather", weatherRouter);
app.use("/calendar", calendarRouter);

app.listen(port, async () => {
	console.log(`App listening on ${getDeviceIp()}/${port}`);
	const publicIp = await getPublicIp();
	console.log(publicIp);
});
