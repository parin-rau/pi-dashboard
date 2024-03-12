import { openDb } from "../db/sqlite.js";
import { weatherSchema, settingsSchema } from "../db/schema.js";
import { range } from "../utils/stringHelpers.js";

const {
	makeTable,
	close,
	dropTable,
	insertOne,
	insertMany,
	getMany,
	getOne,
	deleteRows,
	updateOne,
	upsertOne,
} = await openDb();

const table = "test";
const testSchema = `
    id INTEGER PRIMARY KEY,
    port INTEGER
`;

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

//const readSql = `SELECT * FROM ${table}`;

//readAllRows(readSql, all);

// const one = await getOneRow({
// 	table: "weatherIcons",
// 	condition: { timeOfDay: "day", id: 11 },
// 	columns: ["timeOfDay"],
// });

// const multiple = await getMultipleRows({
// 	table: "weatherIcons",
// 	condition: { timeOfDay: "night" },
// });

const testSet = {
	port: 8080,
};

const testSet2 = [
	{
		port: 200,
	},
	{ port: 3000 },
];

const testSet3 = [{ port: 45 }, { port: 36 }, { port: 111 }];

const updateInput1 = { table, set: { port: 999 }, condition: { port: 36 } };
const upsertInput = { table, set: { id: 4, port: 32 }, conflictKey: "id" };

const iTable = await makeTable({ table: "test", schema: testSchema });

// const one = await insert({ table, set: testSet });
// const multiple = await insertMany({ table, set: testSet2 });
// const multiple2 = await insertMany({ table, set: testSet3 });
//console.log({ iTable, one, multiple, multiple2 });

// const deletion1 = await deleteRows({ table, condition: { id: 11 } });
// const deletion2 = await deleteRows({ table, condition: { id: [2, 4, 5] } });
// const deletion3 = await deleteRows({ table, condition: { id: range(25, 34) } });
// console.log({ iTable, deletion1, deletion2, deletion3 });

//const drop = await dropTable("test");

//const insert = await insertMany({ table: "test", set: testSet3 });
//const update = await updateOne(updateInput1);
const upsert = await upsertOne(upsertInput);

console.log({ iTable, upsert });

await close();
