import express from "express";
import { systemRouter } from "./routes/system.route.js";
import { weatherRouter } from "./routes/weather.route.js";
import { calendarRouter } from "./routes/calendar.route.js";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
	res.send("hello from pi server");
});

app.use("/system", systemRouter);
app.use("/weather", weatherRouter);
app.use("/calendar", calendarRouter);

app.listen(port, () => console.log(`App listening on PORT ${port}`));
