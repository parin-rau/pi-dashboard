import "dotenv/config";
import express from "express";
//import path from "path";
import { systemRouter } from "./routes/system.route.js";
// import { weatherRouter } from "./routes/weather.route.js";
// import { calendarRouter } from "./routes/calendar.route.js";
import { staticRouter } from "./routes/static.route.js";
import { getDeviceIp, getPublicIp } from "./utils/getIp.js";
import { apiRouter } from "./routes/api.route.js";

const app = express();
const port = process.env.PORT ?? 3000;
const __dirname = import.meta.dirname;

app.use(express.json());
//app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
// 	res.sendFile();
// });

//app.use("/");
app.use("/", staticRouter);
app.use("/api", apiRouter);
app.use("/system", systemRouter);
// app.use("/weather", weatherRouter);
// app.use("/calendar", calendarRouter);

app.listen(port, async () => {
	console.log(`App listening on ${getDeviceIp()}/${port}`);
	const publicIp = await getPublicIp();
	console.log(publicIp);
});
