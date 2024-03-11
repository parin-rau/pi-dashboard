import { connectToDb } from "../db/sqlite.js";
import { weatherSchema, settingsSchema } from "../db/schema.js";

const { initTable, close, dropTable } = connectToDb();

initTable("settings", settingsSchema);
initTable("weather", weatherSchema);

const weatherData = await fetch("/").then(async (res) => await res.json());

close();
