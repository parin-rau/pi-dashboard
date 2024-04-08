import express from "express";
import path from "path";
import { existsSync } from "fs";
// import { getData } from "../utils/fetchWrapper.js";
// import { getIcons, shortenDays } from "../utils/weatherApiHelpers.js";
// import { getForecast } from "../models/weather.model.js";
import { getIndexData } from "../utils/viewHelpers.js";

export const staticRouter = express.Router();
const __dirname = import.meta.dirname;

// staticRouter.get("/", async (req, res) => {
// 	const weather = await getData("weather");
// 	console.log({ upcoming: weather.upcoming });

// 	const currentIcon = getIcons(weather.current);
// 	const upcomingIcons = getIcons(weather.upcoming, 3);
// 	const upcomingNames = shortenDays(weather.upcoming, 3);
// 	const events = "";
// 	const emails = "";

// 	res.render("../views/index.ejs", {
// 		weather,
// 		currentIcon,
// 		upcomingIcons,
// 		upcomingNames,
// 		events,
// 		emails,
// 	});
// });

staticRouter.use(express.static(path.join(__dirname, "public")));

staticRouter.get("/:fileName?", async (req, res) => {
	const { fileName } = req.params;
	const hasHtmlExtension =
		typeof fileName === "string" ? fileName.slice(-5) === ".html" : false;
	const fileExists = existsSync(
		path.join(
			__dirname,
			"..",
			"public",
			hasHtmlExtension ? fileName : `${fileName}.html`
		)
	);

	//console.log({ fileName, fileExists });

	if (!hasHtmlExtension && fileExists) {
		//console.log("missing .html extension, but file exists");
		return res.redirect(`/${fileName}.html`);
		// } else if (!fileName || !fileExists) {
		// 	//console.log("No filename provided or filename doesn't exist");
		// 	res.render("index");
		// 	return res.redirect("/index.html");
	} else {
		//console.log("else fall through");

		// const weather = await getForecast();
		// const currentIcon = getIcons(weather.current);
		// const upcomingIcons = getIcons(weather.upcoming, 3);
		// const upcomingNames = shortenDays(weather.upcoming, 3);
		// const events = "";
		// const emails = "";

		const data = await getIndexData();
		res.render("../views/index.ejs", { ...data });

		//return res.redirect("/index.html");
	}
});
