import { connectToDb } from "../db/sqlite.js";
import { weatherSchema, settingsSchema } from "../db/schema.js";

const { initTable, close, dropTable, insertRow, readAllRows } = connectToDb();

const table = "weatherIcons";

//initTable("settings", settingsSchema);
//initTable("weather", weatherSchema);

// dropTable("settings");
// dropTable("weather");
//dropTable("weatherIcons");

// const url = "http://localhost:3000/api/weather/log";
// const weatherDataInsertedCount = await fetch(url).then(
// 	async (res) => await res.json()
// );

//console.log(weatherDataInsertedCount);

const readSql = `SELECT * FROM ${table}`;

const data = readAllRows(readSql);
close();

console.log(data.Database);

//close();
