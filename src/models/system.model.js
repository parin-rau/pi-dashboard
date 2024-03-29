import { settingsSchema } from "../db/schema";
import { Db } from "../db/sqlite";

const { initTable, readAllRows, readOneRow, upsertRows } = openDb();
const table = "settings";

export const writeSettings = (formData) => {
	const createTable = initTable(table, settingsSchema);
	const updateRowsResult = upsertRows({
		table,
		set,
		where: { key: "id", val: 0 },
	});
};

export const readSettings = () => {
	try {
		const rows = readAllRows(`SELECT * FROM ${table}`);

		console.log(rows);
	} catch (e) {
		console.error(e);
	}
};
