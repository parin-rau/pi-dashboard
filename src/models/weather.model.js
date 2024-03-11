import { connectToDb } from "../db/sqlite";
import { weatherSchema } from "../db/schema";

const { initTable, insertRow } = connectToDb();
const table = "WeatherIcons";

const extractIconInfo = (iconUrl) => {
	const splitUrl = iconUrl.split("/");
	const timeOfDay = splitUrl[-2];
	const icon = splitUrl[-1].split("?")[0];

	return { timeOfDay, icon, iconUrl };
};

export const getIconFilenames = (forecast) => {
	initTable(table, weatherSchema);

	let insertedRowCount = 0;
	forecast.forEach((p) => {
		const { timeOfDay, icon, iconUrl } = extractIconInfo(p.icon);
		const { shortForecast } = p;
		insertRow({
			table,
			set: { icon, iconUrl, timeOfDay, shortForecast },
		});
		insertedRowCount++;
	});

	return { insertedRowCount };
};
